<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\TextType;

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
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('title');
        $datagridMapper->add('description');
        $datagridMapper->add('price');
        $datagridMapper->add('slug');
        $datagridMapper->add('photo');
        $datagridMapper->add('additional');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('title');
        $listMapper->addIdentifier('description');
        $listMapper->addIdentifier('price');
        $listMapper->addIdentifier('slug');
        $listMapper->addIdentifier('photo');
        $listMapper->addIdentifier('additional');
    }
}