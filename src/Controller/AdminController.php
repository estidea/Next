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

class AdminController extends AbstractController
{
    /**
     * @Route("/adminpanel", name="adminpanel")
     */
    public function adminpanel()
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN', null, 'User tried to access a page without having ROLE_ADMIN');

        $em = $this->getDoctrine()->getManager();
        
        $booking_items = $em->getRepository(BookingItems::class)
            ->findAll();

        return $this->render('admin/admin.html.twig', [
            'booking_items' => $booking_items
        ]);
    }
}