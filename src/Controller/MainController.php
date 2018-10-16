<?php

namespace App\Controller;

use App\Entity\Offers;

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

        $calendrier = array();
        return $this->render('main/index.html.twig', [
            'offers' => $offers
        ]);
    }

	/**
	 * @Route("/calendrierFeed", name="calendrierFeed", methods={"GET"})
	 */
	public function feedAction()
	{
	    $em = $this->getDoctrine()->getManager();
	    $events = $em->getRepository('App\Entity\Events')
	        ->findAll();
	    $calendrier = array();

	    foreach ($events as $event) {
	        $e = array();
	        $e['id'] = $event->getId();
	        $e['title'] = $event->getTitle();
	        $e['start'] = $event->getBeginAt();
	        $e['end'] = $event->getEndAt();
	        $e['allDay'] = false;
            $e['textColor'] = $event->getCategory()->getColor();
            $e['color'] = '#0000';
            $e['backgroundColor'] = $event->getCategory()->getColor();
            $e['description'] = 'ooueeee';

	        array_push($calendrier, $e);
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
                        'slug' => $offer->getSlug()
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
        return $this->render('main/calendar.html.twig', [
  
        ]);
    }

    /**
     * @Route("/booking", name="booking")
     */
    public function booking()
    {
        return $this->render('main/index.html.twig', [
  
        ]);
    }
}
