import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreatePhase1689278419624 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "phase",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
					},
					{
						name: "phase_number",
						type: "integer",
						isNullable: false,
					},
					{
						name: "dosage",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "frequency",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "start_treatment",
						type: "date",
						isNullable: false,
					},
					{
						name: "end_treatment",
						type: "date",
						isNullable: false,
					},
					{
						name: "active",
						type: "boolean",
						isNullable: false,
					},
				],
			})
		)

		await queryRunner.addColumn(
			"phase",
			new TableColumn({
					name: "treatmentId",
					type: "uuid",
					isNullable: false,
			}),
		)

		await queryRunner.createForeignKey(
			"phase",
			new TableForeignKey({
					columnNames: ["treatmentId"],
					referencedColumnNames: ["id"],
					referencedTableName: "treatment",
					onDelete: "CASCADE",
			}),
		)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("phase", "FK_phase_treatmentId");
    await queryRunner.dropColumn("phase", "treatmentId");
    await queryRunner.dropTable("phase");
  }

}
