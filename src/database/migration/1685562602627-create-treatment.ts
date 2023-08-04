import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTreatment1685562602627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "treatment",
				columns: [
					{
						name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
					},
					{
						name: "allergies",
						type: "varchar",
						isArray: true,
						isNullable: false,
					},
					{
						name: "method",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "active",
						type: "boolean",
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
