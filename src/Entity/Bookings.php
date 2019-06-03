<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BookingsRepository")
 */
class Bookings
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\BookingItems")
     * @ORM\JoinColumn(nullable=false)
     */
    private $booking_item;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="datetime")
     */
    private $begin_at;

    /**
     * @ORM\Column(type="datetime")
     */
    private $end_at;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $phone;

    /**
     * @ORM\Column(type="integer")
     */
    private $number;

    /**
     * @ORM\Column(type="datetime")
     */
    private $booked_at;

    public function __construct()
    {
        $this->booked_at = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBookingItem(): ?BookingItems
    {
        return $this->booking_item;
    }

    public function setBookingItem(?BookingItems $booking_item): self
    {
        $this->booking_item = $booking_item;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getBeginAt(): ?\DateTimeInterface
    {
        return $this->begin_at;
    }

    public function setBeginAt(\DateTimeInterface $begin_at): self
    {
        $this->begin_at = $begin_at;

        return $this;
    }

    public function getEndAt(): ?\DateTimeInterface
    {
        return $this->end_at;
    }

    public function setEndAt(\DateTimeInterface $end_at): self
    {
        $this->end_at = $end_at;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): self
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Gets triggered only on insert

     * @ORM\PrePersist
     */
    public function onPrePersist()
    {
        $this->booked_at = new \DateTime("now");
    }

    public function getBookedAt(): ?\DateTimeInterface
    {
        return $this->booked_at;
    }

    // public function setBookedAt(\DateTimeInterface $booked_at): self
    // {
    //     $this->booked_at = new \DateTime();

    //     return $this;
    // }
}
