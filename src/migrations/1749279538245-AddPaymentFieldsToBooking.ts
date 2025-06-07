import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentFieldsToBooking1749279538245 implements MigrationInterface {
    name = 'AddPaymentFieldsToBooking1749279538245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "paymentId" character varying`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "totalAmount" decimal(10,2)`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "paymentStatus" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "paymentId"`);
    }
}
