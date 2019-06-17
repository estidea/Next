<?php

namespace App\Controller;

use App\Entity\Offers;
use App\Entity\Bookings;
use App\Entity\BookingItems;
use App\Entity\Category;
use App\Entity\Contacts;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        $em = $this->getDoctrine()->getManager();
        $offers = $em->getRepository(Offers::class)
            ->findAll();
        
        $booking_items = $em->getRepository(BookingItems::class)
            ->findAll();

        return $this->render('main/index.html.twig', [
            'offers' => $offers,
            'booking_items' => $booking_items
        ]);
    }

    /**
     * @Route("/getbooking", name="getbooking", methods={"GET","POST"})
     */
    public function getbooking(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if($request->request->get('booking_date')){
            $js_booking_date = $request->request->get('booking_date');
            $js_booking_date = substr($js_booking_date, 0, strpos($js_booking_date, '('));
            $js_booking_date_TS = strtotime($js_booking_date);
            if ($js_booking_date_TS !== false) 
            {
                $request_date = new \DateTime();
                $php_date = $request_date->setTimestamp($js_booking_date_TS);
            } 
            else 
            {
                // invalid date format
            }

            $target_bookings = $em->getRepository(Bookings::class)->findBy(
                ['date' => $php_date]
            );
            
            return $this->json($target_bookings);
        }
        return $this->redirectToRoute('home');
    }

	/**
	 * @Route("/calendrierFeed/", name="calendrierFeed", methods={"GET"})
	 */
	public function feedAction(Request $request)
	{
	    $em = $this->getDoctrine()->getManager();
        $calendrier = array();
        $categories = $request->query->get('categories');
        if ($categories != []) {
            foreach ($categories as $category) {
                $category_entity = $this->getDoctrine()
                    ->getRepository(Category::class)
                    ->findOneBy(
                        ['title' => $category]
                    );

                $events = $category_entity->getEvents();
                foreach ($events as $event) {
                    $e = array();
                    $is_recurring = $event->getRecurring();
                    if ($is_recurring) {
                        $num_day = $event->getBeginAt()->format('N');
                        $e['start'] = $event->getBeginAt()->format('H:i');
                        $e['end'] = $event->getEndAt()->format('H:i');
                        $e['dow'] = array((7 == $num_day) ? '0' : $num_day);
                    } else {
                        $e['start'] = $event->getBeginAt();
                        $e['end'] = $event->getEndAt();
                    }
                    $e['id'] = $event->getId();
                    $e['title'] = $event->getTitle();
                    $e['textColor'] = $event->getCategory()->getColor();
                    $e['color'] = '#0000';
                    $e['backgroundColor'] = $event->getCategory()->getColor();
                    $e['description'] = $category;
                    

                    array_push($calendrier, $e);
                }
            }
        } else {
        }
        
	    return $this->json($calendrier);
	}

    /**
     * @Route("/getdescription", name="getdescription")
     */
    public function getdescription(Request $request)
    {
        if($request->request->get('project_id')){
            $slug = $request->request->get('project_id');
            $offer = $this->getDoctrine()->getRepository(Offers::class)->findOneBy(['slug' => $slug]);
            $arrData = ['title' => $offer->getTitle(),
                        'description' => $offer->getDescription(),
                        'price' => $offer->getPrice(),
                        'photo' => $offer->getPhoto(),
                        'slug' => $offer->getSlug(),
                        'additional' => $offer->getAdditional(),
                        'button' => $offer->getButton(),
                        'href' => $offer->getHref()
                        ];
            return new JsonResponse($arrData);
        }
        
        // redirects to the "main" route
        return $this->redirectToRoute('home');
    }


    /**
     * @Route("/calendar", name="calendar")
     */
    public function calendar(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $checked_category = $request->query->get('category');
        $categories = $em->getRepository(Category::class)
                ->findBy(
                    array(),
                    array('title' => 'ASC')
            );
       
        return $this->render('main/calendar.html.twig', [
            'categories' => $categories,
            'checked_category' => $checked_category
        ]);
    }

    /**
     * @Route("/contacts", name="contacts")
     */
    public function contacts()
    {
        $em = $this->getDoctrine()->getManager();
        $contacts = $em->getRepository(Contacts::class)
            ->findAll();
        return $this->render('main/contacts.html.twig', [
            'contacts' => $contacts
        ]);
    }

    /**
     * @Route("/form", name="form", methods={"POST"})
     */
    public function form(Request $request, \Swift_Mailer $mailer)
    {
        if($request->getMethod() == 'POST'){
            $name = $request->request->get('form-name');
            $category_name = $request->request->get('form-category');
            $category = $this->getDoctrine()->getRepository(BookingItems::class)->findOneBy(['title' => $category_name]);
            $number = $request->request->get('form-number');
            $phone = $request->request->get('form-phone');

            $js_booking_date = strtotime($request->request->get('form-date'));
            $request_date = new \DateTime();
            $php_date = $request_date->setTimestamp($js_booking_date);

            $js_booking_begin = strtotime($request->request->get('form-time-begin'));
            $request_begin = new \DateTime();
            $php_begin = $request_begin->setTimestamp($js_booking_begin);

            $js_booking_end = strtotime($request->request->get('form-time-end'));
            $request_end = new \DateTime();
            $php_end = $request_end->setTimestamp($js_booking_end);

            
            $entityManager = $this->getDoctrine()->getManager();

            $Booking = new Bookings();
            $Booking->setBookingItem($category); 
            $Booking->setNumber($number);
            $Booking->setDate($php_date);
            $Booking->setBeginAt($php_begin);
            $Booking->setEndAt($php_end);
            $Booking->setPhone($phone);
            $Booking->setName($name);

            $entityManager->persist($Booking);
            $entityManager->flush();

            $arrData = ['name' => $name,
                        'category' => $category,
                        'number' => $number,
                        'date' => $php_date,
                        'begin' => $php_begin,
                        'end' => $php_end,
                        'phone' => $phone
                        ];
            $message = (new \Swift_Message('Заявка на бронирование'))
                ->setFrom('nextcreativespace@gmail.com')
                ->setTo('nextcreativespace@gmail.com')
                ->setBody(
                    $this->renderView(
                        // nextcreativespace@gmail.com
                        // templates/emails/registration.html.twig
                        'emails/booking.html.twig',
                        array(
                            'name' => $name,
                            'category' => $category,
                            'number' => $number,
                            'date' => $php_date,
                            'begin' => $php_begin,
                            'end' => $php_end,
                            'phone' => $phone
                        )
                    ),
                    'text/html'
                );

            $mailer->send($message);
            return new JsonResponse($arrData);
        }
        
        // redirects to the "main" route
        return $this->redirectToRoute('home');
    }

    /**
     * @Route("/event-form", name="event-form", methods={"POST"})
     */
    public function eventForm(Request $request, \Swift_Mailer $mailer)
    {
        // if($request->getMethod() == 'POST'){
        //     $name = $request->request->get('form-name');
        //     $event = $request->request->get('form-event');
        //     $number = $request->request->get('form-number');
        //     $date = $request->request->get('form-date');
        //     $begin = $request->request->get('form-begin');
        //     $phone = $request->request->get('form-phone');
        //     $message = $request->request->get('form-message');

        //     $entityManager = $this->getDoctrine()->getManager();
        //     $bookingEvent = new BookingEvents();
        //     $bookingEvent->setEvent($event);
        //     $bookingEvent->setNumber($number);
        //     $bookingEvent->setDate($date);
        //     $bookingEvent->setBeginAt($begin);
        //     $bookingEvent->setPhone($phone);
        //     $bookingEvent->setMessage($message);
        //     $bookingEvent->setName($name);

        //     $entityManager->persist($bookingEvent);
        //     $entityManager->flush();

        //     $arrData = ['name' => $name,
        //                 'event' => $event,
        //                 'number' => $number,
        //                 'date' => $date,
        //                 'begin' => $begin,
        //                 'phone' => $phone,
        //                 'message' => $message
        //                 ];
        //     $message = (new \Swift_Message('Заявка на бронирование события'))
        //         ->setFrom('nextcreativespace@gmail.com')
        //         ->setTo('nextcreativespace@gmail.com')
        //         ->setBody(
        //             $this->renderView(
        //                 'emails/booking-event.html.twig',
        //                 array(
        //                     'name' => $name,
        //                     'event' => $event,
        //                     'number' => $number,
        //                     'date' => $date,
        //                     'begin' => $begin,
        //                     'phone' => $phone,
        //                     'message' => $message
        //                 )
        //             ),
        //             'text/html'
        //         );

        //     $mailer->send($message);
        //     return new JsonResponse($arrData);
        // }
        
        // redirects to the "main" route
        return $this->redirectToRoute('home');
    }
}
