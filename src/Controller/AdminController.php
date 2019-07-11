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
        // $this->denyAccessUnlessGranted('ROLE_ADMIN', null, 'User tried to access a page without having ROLE_ADMIN');
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
     * @Route("/adminform", name="adminform", methods={"POST","PUT"})
     */
    public function adminform(Request $request)
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
            return new JsonResponse($arrData);
        }

        // if($request->getMethod() == 'PUT'){
        //     $name = $request->request->get('form-name');
        //     $category_name = $request->request->get('form-category');
        //     $category = $this->getDoctrine()->getRepository(BookingItems::class)->findOneBy(['title' => $category_name]);
        //     $number = $request->request->get('form-number');
        //     $phone = $request->request->get('form-phone');
        //     $id = $request->request->get('form-id');

        //     $js_booking_date = strtotime($request->request->get('form-date'));
        //     $request_date = new \DateTime();
        //     $php_date = $request_date->setTimestamp($js_booking_date);

        //     $js_booking_begin = strtotime($request->request->get('form-time-begin'));
        //     $request_begin = new \DateTime();
        //     $php_begin = $request_begin->setTimestamp($js_booking_begin);

        //     $js_booking_end = strtotime($request->request->get('form-time-end'));
        //     $request_end = new \DateTime();
        //     $php_end = $request_end->setTimestamp($js_booking_end);

            
        //     $entityManager = $this->getDoctrine()->getManager();

        //     $Booking = $entityManager->getRepository(Bookings::class)->find($id);
            
        //     $Booking->setBookingItem($category); 
        //     $Booking->setNumber($number);
        //     $Booking->setDate($php_date);
        //     $Booking->setBeginAt($php_begin);
        //     $Booking->setEndAt($php_end);
        //     $Booking->setPhone($phone);
        //     $Booking->setName($name);

        //     $entityManager->persist($Booking);
        //     $entityManager->flush();

        //     $arrData = ['name' => $name,
        //                 'category' => $category,
        //                 'number' => $number,
        //                 'date' => $php_date,
        //                 'begin' => $php_begin,
        //                 'end' => $php_end,
        //                 'phone' => $phone
        //                 ];
        //     return new JsonResponse($arrData);
        // }
        
        // redirects to the "main" route
        return $this->redirectToRoute('adminpanel');
    }

}