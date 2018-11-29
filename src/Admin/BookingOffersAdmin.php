<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class BookingOffersAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('offer', TextType::class);
        $formMapper->add('date', DateTimeType::class,array(
            'widget' => 'single_text',
            'format' => 'MM-dd'));
        $formMapper->add('beginAt', DateTimeType::class,array(
            'widget' => 'single_text',
            'format' => 'H:i'));
        $formMapper->add('endAt', DateTimeType::class,array(
            'widget' => 'single_text',
            'format' => 'H:i'));
        $formMapper->add('name', TextType::class);
        $formMapper->add('number', TextType::class);
        $formMapper->add('phone', TextType::class);
        $formMapper->add('message', TextType::class);
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('offer');
        $datagridMapper->add('date');
        $datagridMapper->add('beginAt');
        $datagridMapper->add('endAt');
        $datagridMapper->add('number');
        $datagridMapper->add('phone');
        $datagridMapper->add('message');
        $datagridMapper->add('name');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('offer');
        $listMapper->addIdentifier('date');
        $listMapper->addIdentifier('beginAt');
        $listMapper->addIdentifier('endAt');
        $listMapper->addIdentifier('number');
        $listMapper->addIdentifier('phone');
        $listMapper->addIdentifier('message');
        $listMapper->addIdentifier('name');
    }
}