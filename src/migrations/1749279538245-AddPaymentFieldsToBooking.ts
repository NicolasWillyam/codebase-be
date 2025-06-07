import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Migration: Thêm các trường liên quan đến thanh toán vào bảng "bookings".
 * - paymentId: Mã thanh toán (liên kết với hệ thống thanh toán bên ngoài nếu có).
 * - totalAmount: Tổng số tiền cần thanh toán.
 * - paymentStatus: Trạng thái thanh toán (ví dụ: PENDING, COMPLETED, FAILED, ...).
 */
export class AddPaymentFieldsToBooking1749279538245 implements MigrationInterface {
    name = 'AddPaymentFieldsToBooking1749279538245'

    /**
     * Thực thi migration: thêm các cột mới vào bảng "bookings".
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Thêm cột "paymentId" để lưu mã thanh toán (chuỗi ký tự).
        await queryRunner.query(`ALTER TABLE "bookings" ADD "paymentId" character varying`);

        // Thêm cột "totalAmount" để lưu tổng số tiền thanh toán, kiểu decimal với 2 chữ số sau dấu phẩy.
        await queryRunner.query(`ALTER TABLE "bookings" ADD "totalAmount" decimal(10,2)`);

        // Thêm cột "paymentStatus" để lưu trạng thái thanh toán (enum dạng string).
        await queryRunner.query(`ALTER TABLE "bookings" ADD "paymentStatus" character varying`);
    }

    /**
     * Rollback migration: xóa các cột đã thêm nếu cần revert thay đổi.
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa cột "paymentStatus".
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "paymentStatus"`);

        // Xóa cột "totalAmount".
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "totalAmount"`);

        // Xóa cột "paymentId".
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "paymentId"`);
    }
}

