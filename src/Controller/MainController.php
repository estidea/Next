<?php

namespace App\Controller;

use App\Entity\Offers;
use App\Entity\Category;

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

        return $this->render('main/index.html.twig', [
            'offers' => $offers
        ]);
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
    public function calendar()
    {
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository(Category::class)
            ->findAll();
        return $this->render('main/calendar.html.twig', [
            'categories' => $categories
        ]);
    }

    /**
     * @Route("/contacts", name="contacts")
     */
    public function contacts()
    {


        return $this->render('main/contacts.html.twig', [
  
        ]);
    }

    /**
     * @Route("/form", name="form", methods={"POST"})
     */
    public function form(Request $request, \Swift_Mailer $mailer)
    {
        if($request->getMethod() == 'POST'){
            $name = $request->request->get('form-name');
            $offer = $request->request->get('form-offer');
            $number = $request->request->get('form-number');
            $date = $request->request->get('form-date');
            $begin = $request->request->get('form-begin');
            $end = $request->request->get('form-end');
            $phone = $request->request->get('form-phone');
            $message = $request->request->get('form-message');
            $arrData = ['name' => $name,
                        'offer' => $offer,
                        'number' => $number,
                        'date' => $date,
                        'begin' => $begin,
                        'end' => $end,
                        'phone' => $phone,
                        'message' => $message
                        ];
            $message = (new \Swift_Message('Заявка на бронирование'))
                ->setFrom('nick.whatsoever@gmail.com')
                ->setTo('nick.whatsoever@gmail.com')
                ->setBody(
                    $this->renderView(
                        // templates/emails/registration.html.twig
                        'emails/booking.html.twig',
                        array(
                            'name' => $name,
                            'offer' => $offer,
                            'number' => $number,
                            'date' => $date,
                            'begin' => $begin,
                            'end' => $end,
                            'phone' => $phone,
                            'message' => $message
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
        if($request->getMethod() == 'POST'){
            $name = $request->request->get('form-name');
            $event = $request->request->get('form-event');
            $number = $request->request->get('form-number');
            $date = $request->request->get('form-date');
            $begin = $request->request->get('form-begin');
            $phone = $request->request->get('form-phone');
            $message = $request->request->get('form-message');
            $arrData = ['name' => $name,
                        'event' => $event,
                        'number' => $number,
                        'date' => $date,
                        'begin' => $begin,
                        'phone' => $phone,
                        'message' => $message
                        ];
            $message = (new \Swift_Message('Заявка на бронирование события'))
                ->setFrom('nick.whatsoever@gmail.com')
                ->setTo('nick.whatsoever@gmail.com')
                ->setBody(
                    $this->renderView(
                        'emails/booking-event.html.twig',
                        array(
                            'name' => $name,
                            'event' => $event,
                            'number' => $number,
                            'date' => $date,
                            'begin' => $begin,
                            'phone' => $phone,
                            'message' => $message
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
}
