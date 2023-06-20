import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTreatment1685562602627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "treatment",
				columns: [
					{
						name: "id",
						type: "integer",
						isPrimary: true,
					},
					{
						name: "dosage",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "allergies",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "frequency",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "method",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "start_Treatment",
						type: "date",
						isNullable: false,
					},
					{
						name: "end_Treatment",
						type: "date",
						isNullable: false,
					},
					{
            name: "patientId",
            type: "uuid",
            isNullable: false,
          },
				],
			})
		)
	}

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("treatment")
	}
}
