<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
// use App\EventListener\FullCalendarListener;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this->render('main/index.html.twig', [
  
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
	        $e['allDay'] = true;

	        array_push($calendrier, $e);
	    }
	    return $this->json($calendrier);
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
