<?php

namespace App\Repository;

use App\Entity\BookingItems;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method BookingItems|null find($id, $lockMode = null, $lockVersion = null)
 * @method BookingItems|null findOneBy(array $criteria, array $orderBy = null)
 * @method BookingItems[]    findAll()
 * @method BookingItems[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookingItemsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, BookingItems::class);
    }

//    /**
//     * @return BookingItems[] Returns an array of BookingItems objects
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
    public function findOneBySomeField($value): ?BookingItems
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
