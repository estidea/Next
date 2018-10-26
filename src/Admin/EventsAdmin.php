<?php

namespace App\Admin;

use App\Entity\Category;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Sonata\AdminBundle\Form\Type\ModelType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class EventsAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('title', TextType::class);
        $formMapper->add('beginAt', DateTimeType::class,array(
            'date_widget' => 'single_text'));
        $formMapper->add('endAt', DateTimeType::class,array(
            'date_widget' => 'single_text'));
        $formMapper->add('recurring', ChoiceType::class, array(
            'choices'  => array(
                'yes' => true,
                'no' => false,
            ),
        ));
        $formMapper->add('category', EntityType::class, array(
            'class' => Category::class,
            'choice_label' => 'title',
        ));
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('title');
        $datagridMapper->add('beginAt');
        $datagridMapper->add('endAt');
        $datagridMapper->add('category');
        $datagridMapper->add('recurring');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('title');
        $listMapper->addIdentifier('beginAt');
        $listMapper->addIdentifier('endAt');
        $listMapper->addIdentifier('category');
        $listMapper->addIdentifier('recurring');
    }
}