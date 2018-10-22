<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class OffersAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('title', TextType::class);
        $formMapper->add('description', TextType::class);
        $formMapper->add('price', TextType::class, array(
            'required'   => false,
        ));
        $formMapper->add('slug', TextType::class);
        $formMapper->add('photo', TextType::class);
        $formMapper->add('additional', TextType::class, array(
            'required'   => false,
        ));
        $formMapper->add('button', ChoiceType::class, array(
            'choices'  => array(
                'Yes' => true,
                'No' => false,
            ),
        ));
        $formMapper->add('href', TextType::class, array(
            'required'  => false,
            'empty_data' => '',
        ));
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('title');
        $datagridMapper->add('description');
        $datagridMapper->add('price');
        $datagridMapper->add('slug');
        $datagridMapper->add('photo');
        $datagridMapper->add('additional');
        $datagridMapper->add('button');
        $datagridMapper->add('href');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('title');
        $listMapper->addIdentifier('description');
        $listMapper->addIdentifier('price');
        $listMapper->addIdentifier('slug');
        $listMapper->addIdentifier('photo');
        $listMapper->addIdentifier('additional');
        $listMapper->addIdentifier('button');
        $listMapper->addIdentifier('href');
    }
}