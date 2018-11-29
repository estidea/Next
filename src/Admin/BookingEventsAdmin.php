<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class BookingEventsAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('event', TextType::class);
        $formMapper->add('date', DateTimeType::class,array(
            'widget' => 'single_text',
            'format' => 'MM-dd'));
        $formMapper->add('beginAt', DateTimeType::class,array(
            'widget' => 'single_text',
            'format' => 'H:i'));
        $formMapper->add('name', TextType::class);
        $formMapper->add('number', TextType::class);
        $formMapper->add('phone', TextType::class);
        $formMapper->add('message', TextType::class);
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('event');
        $datagridMapper->add('date');
        $datagridMapper->add('beginAt');
        $datagridMapper->add('number');
        $datagridMapper->add('phone');
        $datagridMapper->add('message');
        $datagridMapper->add('name');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('event');
        $listMapper->addIdentifier('date');
        $listMapper->addIdentifier('beginAt');
        $listMapper->addIdentifier('number');
        $listMapper->addIdentifier('phone');
        $listMapper->addIdentifier('message');
        $listMapper->addIdentifier('name');
    }
}