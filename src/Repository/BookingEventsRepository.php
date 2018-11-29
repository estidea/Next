<?php

namespace App\Repository;

use App\Entity\BookingEvents;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method BookingEvents|null find($id, $lockMode = null, $lockVersion = null)
 * @method BookingEvents|null findOneBy(array $criteria, array $orderBy = null)
 * @method BookingEvents[]    findAll()
 * @method BookingEvents[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookingEventsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, BookingEvents::class);
    }

//    /**
//     * @return BookingEvents[] Returns an array of BookingEvents objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BookingEvents
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
