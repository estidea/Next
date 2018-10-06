<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

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
     * @Route("/calendar", name="calendar")
     */
    public function calendar()
    {
        return $this->render('main/index.html.twig', [
  
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
