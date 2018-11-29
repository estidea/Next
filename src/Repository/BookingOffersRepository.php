<?php

namespace App\Repository;

use App\Entity\BookingOffers;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method BookingOffers|null find($id, $lockMode = null, $lockVersion = null)
 * @method BookingOffers|null findOneBy(array $criteria, array $orderBy = null)
 * @method BookingOffers[]    findAll()
 * @method BookingOffers[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookingOffersRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, BookingOffers::class);
    }

//    /**
//     * @return BookingOffers[] Returns an array of BookingOffers objects
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
    public function findOneBySomeField($value): ?BookingOffers
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
