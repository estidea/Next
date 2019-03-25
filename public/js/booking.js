var workingHours = [10,23];
var consoles = ['Xbox-360','Sony PS'];
console.log(offers);
var events = [
  {
    'name': 'Vasya',
    'console': 'Xbox-360',
    'beginAt': new Date(2015,7,17,10,30),
    'endAt': new Date(2015,7,17,11,30),
    'options': { class: 'booking-consoles' }
  },
  {
    'name': 'Kolya',
    'console': 'Sony PS',
    'beginAt': new Date(2015,7,17,12),
    'endAt': new Date(2015,7,17,13),
    'options': ''
  },
];

// window.addEventListener("load", function() {
//   setTimeout(function() {
//     $("#preloader-bg").toggleClass("preloader-active");
//       $(".pong-loader").toggleClass("preloader-active");
//       $("#preloader-bg").css('background-color','rgba(0, 0, 0, .5)');
//   },200);
// });

var formTimeBegin = $('#form-time-begin'),
  formTimeEnd = $('#form-time-end');
  formCategory = $('#form-category');


function init() {
  var timetable = new Timetable();

  timetable.setScope(workingHours[0],workingHours[1]);

  timetable.addLocations(consoles);
  for (var i = 0; i<events.length; i++){
    timetable.addEvent(
      events[i].name,
      events[i].console,
      events[i].beginAt,
      events[i].endAt,
      events[i].options,
    );
  };

  var renderer = new Timetable.Renderer(timetable);
  renderer.draw('.timetable');
  var target = $('span[title="new booking"]');
  if (target.length>0) {
    $('time').scrollTo(target);
    var leftTarget = parseInt(target.css("left"));
    var widthTargetParent = parseInt($('.room-timeline').css("width"));
    if (leftTarget<widthTargetParent/2) {
      $('time').scrollTo('-=300px');
    }
  };

  $('.room-timeline li').on('mouseup',function(e) {
     // short press!
     // Добудем название события, в которое кликнули
    var index = $(this).index();
    var bookingItem = $('.timetable li, .timetable ul').children().eq(index).text();
    // Добудем количество часов
    var hours = workingHours[1]-workingHours[0];
    // Куда кликнул – начало брони
    if (e.target.tagName == "SPAN" || e.target.tagName == "SMALL") {
      // Если попал на уже занятое время
    } else {
      // Который час кликнут?
      var quarter = $(this).width()/hours/4;
      var bookingTimeBegin = Math.floor(e.offsetX/quarter);
      // Добавляем новую бронь на поле
      var hoursBegin = workingHours[0] + Math.floor(bookingTimeBegin/4);
      var minutesBegin = bookingTimeBegin%4*15;
      var strTimeBegin = hoursBegin + ':' + minutesBegin;
      drawForm(strTimeBegin, bookingItem);
    }
  });
}

init();

function drawForm(bookingTimeBegin, bookingItem, bookingTimeEnd) {
  timeBegin = bookingTimeBegin.split(':')
  hoursBegin = +timeBegin[0]; // 9
  minutesBegin = +timeBegin[1]; // 
  

  var hoursEnd, minutesEnd;

  if (bookingTimeEnd == undefined ){
    hoursEnd = hoursBegin + 1;
    minutesEnd = minutesBegin;
  } else {
    timeEnd = bookingTimeEnd.split(':')
    hoursEnd = +timeEnd[0];
    minutesEnd = +timeEnd[1];
  }
  if(hoursBegin<9) hoursBegin = 9;
  if(hoursEnd<=9) {hoursEnd = 9; minutesEnd = 15;}
  if(hoursBegin>=23) {hoursBegin = 22; minutesBegin = 30}
  if(hoursEnd>=23 && minutesEnd>0) {hoursEnd = 23; minutesEnd = 0}

  var timeDateBegin = new Date(2015,7,17,hoursBegin,minutesBegin);
  var timeDateEnd = new Date(2015,7,17,hoursEnd,minutesEnd);
  for (var i = 0; i<events.length; i++){
    if(events[i].name=='new booking') {
      continue;
    }
    if(bookingItem==events[i].console) {
      var bookedItemDateBegin = events[i].beginAt,
          bookedItemDateEnd = events[i].endAt;
      // 1) когда начало попадает в занятый диапазон
      if(timeDateBegin>bookedItemDateBegin && timeDateBegin<bookedItemDateEnd) {
        console.log('1 case - in begin');
        timeDateBegin = bookedItemDateEnd;
        hoursBegin = timeDateBegin.getHours();
        minutesBegin = timeDateBegin.getMinutes();
      }
      // 2) когда конец попадает в занятый диапазон
      if(timeDateEnd>bookedItemDateBegin && timeDateEnd<bookedItemDateEnd) {
        console.log('2 case - in end');
        timeDateEnd = bookedItemDateBegin;
        hoursEnd = timeDateEnd.getHours();
        minutesEnd = timeDateEnd.getMinutes();
      }
      // 3) когда бронь перекрывает занятый диапазон
      if(timeDateBegin<bookedItemDateBegin && timeDateEnd>=bookedItemDateEnd) {
        console.log('3 case - overlay');
        timeDateEnd = bookedItemDateBegin;
        hoursEnd = timeDateEnd.getHours();
        minutesEnd = timeDateEnd.getMinutes();
      }
    }
  }
  // Проверяем, есть ли на поле бронь ивента, если есть, то уничтожаем
  if (events[events.length-1].name == 'new booking') events.splice(-1,1)
  events.push(
    {
    'name': 'new booking',
    'console': bookingItem,
    'beginAt': timeDateBegin,
    'endAt': timeDateEnd,
    'options': { class: 'vip-only' }
    }
  );
  if(hoursBegin.toString().length<2) hoursBegin = '0'+hoursBegin.toString();
  if(minutesBegin.toString().length<2) minutesBegin = '0'+minutesBegin.toString();
  if(hoursEnd.toString().length<2) hoursEnd = '0'+hoursEnd.toString();
  if(minutesEnd.toString().length<2) minutesEnd = '0'+minutesEnd.toString();
  formTimeBegin.val(hoursBegin + ':' + minutesBegin);
  formTimeEnd.val(hoursEnd +':' + minutesEnd);
  formCategory.val(bookingItem);

  init();
}

// Если пользователь меняет время с формочки
formTimeEnd.on('change',change);
formTimeBegin.on('change',change);
formCategory.on('change',change);

function change() {
  var bookingTimeBegin = formTimeBegin.val();
  var bookingTimeEnd = formTimeEnd.val();
  if (bookingTimeEnd<=bookingTimeBegin) {
    var timeEnd = bookingTimeBegin.split(':')
    hoursEnd = +timeEnd[0]+1;
    bookingTimeEnd = hoursEnd + ':' + timeEnd[1];
    formTimeEnd.val(bookingTimeEnd);
  }
  var bookingItem = formCategory.val();
  drawForm(bookingTimeBegin, bookingItem, bookingTimeEnd);
}

// остановился на том, что клацать событие можно в любой точке поля
// DONE если событие цепляет кого-то из забронированных, его время корректируется
// 2) Как-то сделать так, чтобы не приходилось кликать в пустом месте для анфокуса с инпута тайм
// 3) Убрать проверку на попадание в себя самого