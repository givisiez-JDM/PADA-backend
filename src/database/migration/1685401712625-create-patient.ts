import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreatePatient1685401712625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "patient",
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
            isNullable: true,
          },
          {
            name: "photo",
            type: "varchar",
            isNullable: true,
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
            name: "telephone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "birth_date",
            type: "date",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.addColumn(
      "patient",
      new TableColumn({
        name: "doctorId",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "patient",
      new TableForeignKey({
        columnNames: ["doctorId"],
        referencedColumnNames: ["id"],
        referencedTableName: "doctor",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("patient", "FK_patient_doctorId");
    await queryRunner.dropColumn("patient", "doctorId");
    await queryRunner.dropTable("patient");
  }
}
