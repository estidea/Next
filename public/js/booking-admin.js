var workingHours = [10,23];
var bookings = [];
var currentDate = new Date(); // first value for current date = today
getFirstBookings();

var formTimeBegin = $('#form-time-begin'),
  formTimeEnd = $('#form-time-end'),
  formCategory = $('#form-category'),
  formDate = $('#form-date'),
  formName = $('#form-name'),
  formNumber = $('#form-number'),
  formPhone = $('#form-phone');
  

function getBookings(bookingDate) {
  $("#preloader-bg").addClass("preloader-active");
  $(".pong-loader").addClass("preloader-active");
  $.ajax({
      url:'/getbooking',
      type: "POST",
      dataType: "json",
      data: {
          "booking_date": bookingDate
      },
      async: true,
      success: function (data)
      {
        $("#preloader-bg").removeClass("preloader-active");
        $(".pong-loader").removeClass("preloader-active");
        bookings = [];
        for(var i=0;i<data.length;i++) {
          bookings.push({
            'name': data[i].name,
            'bookingItem': data[i].bookingItem.title,
            'beginAt': new Date(data[i].beginAt),
            'endAt': new Date(data[i].endAt),
            'options': { 
              class: data[i].bookingItem.className, 
              data: {
                phone: data[i].phone,
                number: data[i].number
              },
              onClick: function(event, timetable, clickEvent) {
                var hoursBegin = event.startDate.getHours();
                var minutesBegin = event.startDate.getMinutes();
                if (minutesBegin==0) minutesBegin = '00';
                var hoursEnd = event.endDate.getHours();
                var minutesEnd = event.endDate.getMinutes();
                if (minutesEnd==0) minutesEnd = '00';

                formTimeBegin.val(hoursBegin + ':' + minutesBegin);
                formTimeEnd.val(hoursEnd + ':' + minutesEnd);
                formCategory.val(event.location);
                formNumber.val(event.options.data.number);
                formPhone.val(event.options.data.phone);
                formName.val(event.name);
              }
            }
          });
        }
        
        init();
      },
      error: function() {
        $("#preloader-bg").removeClass("preloader-active");
        $(".pong-loader").removeClass("preloader-active");
      }
  });
  return false;
}

function getFirstBookings() {
  var day = ("0" + currentDate.getDate()).slice(-2);
  var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  var today = (day)+"."+ (month)+"."+currentDate.getFullYear();
  $('#form-date').val(today);
  getBookings(currentDate);
}

function init() {
  
  var timetable = new Timetable();

  timetable.setScope(workingHours[0],workingHours[1]);
  timetable.addLocations(bookingItems);
  for (var i = 0; i<bookings.length; i++){
    timetable.addEvent(
      bookings[i].name,
      bookings[i].bookingItem,
      bookings[i].beginAt,
      bookings[i].endAt,
      bookings[i].options,
    );
  };

  var renderer = new Timetable.Renderer(timetable);
  renderer.draw('.timetable');
  var target = $('span[title="Новая бронь"]');
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
      var hoursBeginClicked = workingHours[0] + Math.floor(bookingTimeBegin/4); // 13
      var minutesBeginClicked = bookingTimeBegin%4*15; // 15
      var strTimeBegin = hoursBeginClicked + ':' + minutesBeginClicked; // 13:15

      // Смотрим на формочку. Фиксируем разницу во времени между началом и окончанием брони
      
      var bookingTimeEnd = formTimeEnd.val(); // 12:30
      var timeEnd = bookingTimeEnd.split(':');
      var hoursEnd = +timeEnd[0]; // 12
      var minutesEnd = +timeEnd[1]; // 30

      var bookingTimeBeginLast = formTimeBegin.val(); // 11:45
      var timeBeginLast = bookingTimeBeginLast.split(':');
      var hoursBeginLast = +timeBeginLast[0]; // 11
      var minutesBeginLast = +timeBeginLast[1]; // 45

      
      // Проверка на первое нажатие
      if (hoursEnd == 11 && minutesEnd == 0) {
        hoursEnd = hoursBeginClicked + 1;
      } else {
        var diffHours = hoursEnd - hoursBeginLast; // 12 - 11 = 1
        var diffMinutes = minutesEnd - minutesBeginLast; // 30 - 45 = -15
        if (diffMinutes<0) {
          hoursEnd = hoursBeginClicked + diffHours - 1; // 13 + 1 - 1
          minutesEnd = minutesBeginClicked + Math.abs(diffMinutes+60); // 15 + -15 + 60 = 60
          if (minutesEnd>=60) {
            minutesEnd = Math.abs(minutesEnd-60); // 60-60 = 0
            hoursEnd++; // 13 + 1 = 14
          }
        }
        // else if (diffMinutes>=60) {
        //   hoursEnd = hoursBeginClicked + diffHours + 1;
        //   minutesEnd = Math.abs(diffMinutes-60);
        // }
        else {
          hoursEnd = hoursBeginClicked + diffHours; // 12 + 1 = 13
          minutesEnd = minutesBeginClicked + diffMinutes;
          if (minutesEnd>=60) {
            minutesEnd = Math.abs(minutesEnd-60);
            hoursEnd++;
          }
        }
        
        if (hoursEnd >=23) {
          hoursEnd = 23;
          minutesEnd = '00';
        } 
      }
    
      var strTimeEnd = hoursEnd + ':' + minutesEnd;
      drawForm(strTimeBegin, bookingItem, strTimeEnd);
    }
  });
}

init();

function drawForm(bookingTimeBegin, bookingItem, bookingTimeEnd) {
  
  timeBegin = bookingTimeBegin.split(':')
  hoursBegin = +timeBegin[0]; // 9
  minutesBegin = +timeBegin[1]; // 
  

  var hoursEnd, minutesEnd;

  
  timeEnd = bookingTimeEnd.split(':')
  hoursEnd = +timeEnd[0];
  minutesEnd = +timeEnd[1];
  
  if(hoursBegin<9) hoursBegin = 9;
  if(hoursEnd<=9) {hoursEnd = 9; minutesEnd = 15;}
  if(hoursBegin>=23) {hoursBegin = 22; minutesBegin = 30}
  if(hoursEnd>=23 && minutesEnd>0) {hoursEnd = 23; minutesEnd = 0}

  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();
  var currentDay = currentDate.getDate();

  var timeDateBegin = new Date(currentYear,currentMonth,currentDay,hoursBegin,minutesBegin);
  var timeDateEnd = new Date(currentYear,currentMonth,currentDay,hoursEnd,minutesEnd);

  for (var i = 0; i<bookings.length; i++){
    if(bookings[i].name=='Новая бронь') {
      continue;
    }
    if(bookingItem==bookings[i].bookingItem) {
      var bookedItemDateBegin = bookings[i].beginAt,
          bookedItemDateEnd = bookings[i].endAt;
      // 1) когда начало попадает в занятый диапазон
      if(timeDateBegin>bookedItemDateBegin && timeDateBegin<bookedItemDateEnd) {
        timeDateBegin = bookedItemDateEnd;
        hoursBegin = timeDateBegin.getHours();
        minutesBegin = timeDateBegin.getMinutes();
      }
      // 2) когда конец попадает в занятый диапазон
      if(timeDateEnd>bookedItemDateBegin && timeDateEnd<bookedItemDateEnd) {
        timeDateEnd = bookedItemDateBegin;
        hoursEnd = timeDateEnd.getHours();
        minutesEnd = timeDateEnd.getMinutes();
      }
      // 3) когда бронь перекрывает занятый диапазон
      if(timeDateBegin<bookedItemDateBegin && timeDateEnd>=bookedItemDateEnd) {
        timeDateEnd = bookedItemDateBegin;
        hoursEnd = timeDateEnd.getHours();
        minutesEnd = timeDateEnd.getMinutes();
      }
    }
  }
  // Проверяем, есть ли на поле бронь ивента, если есть, то уничтожаем
  if(bookings[bookings.length-1]) {
    if (bookings[bookings.length-1].name == 'Новая бронь') bookings.splice(-1,1)
  }
  bookings.push(
    {
    'name': 'Новая бронь',
    'bookingItem': bookingItem,
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

// Смена даты
formDate.on('change',changeDate);

function changeDate() {
  var dateFromForm = $('#form-date').val();
  var yearFromForm = dateFromForm.slice(6,10);
  var monthFromForm = dateFromForm.slice(3,5);
  var dayFromForm = dateFromForm.slice(0,2);

  currentDate = new Date(yearFromForm, monthFromForm-1, dayFromForm, 00, 00, 0, 0);
  getBookings(currentDate);
}

// остановился на том, что клацать событие можно в любой точке поля
// DONE если событие цепляет кого-то из забронированных, его время корректируется
// 2) Как-то сделать так, чтобы не приходилось кликать в пустом месте для анфокуса с инпута тайм
// 3) Убрать проверку на попадание в себя самого

// 4) Когда меняешь дату, то новая бронь не отображается в списке (очищается букингс)