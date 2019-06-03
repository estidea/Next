<?php

namespace App\Admin;
use App\Entity\BookingItems;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class BookingsAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('booking_item', EntityType::class, array(
            'class' => BookingItems::class,
            'choice_label' => 'title',
        ));
        $formMapper->add('date', DateTimeType::class,array(
            'date_widget' => 'single_text',
            'format' => 'MM-dd'));
        $formMapper->add('begin_at', DateTimeType::class,array(
            'date_widget' => 'single_text',
            'format' => 'H:i'));
        $formMapper->add('end_at', DateTimeType::class,array(
            'date_widget' => 'single_text',
            'format' => 'H:i'));
        $formMapper->add('name', TextType::class);
        $formMapper->add('number', TextType::class);
        $formMapper->add('phone', TextType::class);
        $formMapper->add('booked_at', DateTimeType::class,array(
            'date_widget' => 'single_text',
            'format' => 'H:i'));
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('booking_item');
        $datagridMapper->add('date');
        $datagridMapper->add('begin_at');
        $datagridMapper->add('end_at');
        $datagridMapper->add('number');
        $datagridMapper->add('phone');
        $datagridMapper->add('booked_at');
        $datagridMapper->add('name');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('booking_item');
        $listMapper->addIdentifier('date');
        $listMapper->addIdentifier('begin_at');
        $listMapper->addIdentifier('end_at');
        $listMapper->addIdentifier('number');
        $listMapper->addIdentifier('phone');
        $listMapper->addIdentifier('booked_at');
        $listMapper->addIdentifier('name');
    }
}