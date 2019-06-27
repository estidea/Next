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

    /**
     * @Route("/getadminbooking", name="getadminbooking", methods={"GET","POST"})
     */
    public function getadminbooking(Request $request)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN', null, 'User tried to access a page without having ROLE_ADMIN');
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

}