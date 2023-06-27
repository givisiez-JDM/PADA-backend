import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateDoctor1685401687214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "doctor",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "about",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "CRM",
            type: "varchar",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "specialty",
            type: "varchar",
            isNullable: true
          },
          {
            name: "photo",
            type: "varchar",
            isNullable: true
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("doctor");
  }
}
