import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HealthReport {
    @PrimaryColumn()
    id: string;

    @Column({ type: "varchar", nullable: false })
    generalHealth: string;

    @Column({ type: 'date', nullable: false })
    date: Date;

    @Column({ type: 'time', nullable: false })
    time: Date

    @Column({ type: "uuid", nullable: false })
    patientId: string
}