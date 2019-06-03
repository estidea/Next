<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190326211130 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE booking_events');
        $this->addSql('DROP TABLE booking_offers');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE booking_events (id INT AUTO_INCREMENT NOT NULL, event VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, date VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, begin_at VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, number INT NOT NULL, phone VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, message LONGTEXT DEFAULT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE booking_offers (id INT AUTO_INCREMENT NOT NULL, offer VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, date VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, begin_at VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, end_at VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, number INT NOT NULL, phone VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, message LONGTEXT DEFAULT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
    }
}
