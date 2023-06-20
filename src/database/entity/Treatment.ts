import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./Patient";
import { Allergies, Dosage, Frequency, Method } from "../../interfaces/ITreatment";

@Entity()
export abstract class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Dosage,
    nullable: false,
  })
  dosage: string;

  @Column({
    type: "enum",
    enum: Allergies,
    nullable: false,
  })
  allergies: string;

  @Column({
    type: "enum",
    enum: Frequency,
    nullable: false,
  })
  frequency: string;

  @Column({
    type: "enum",
    enum: Method,
    nullable: false,
  })
  method: string;

  @Column({
    name: 'start_Treatment',
    type: "date",
    nullable: false,
  })
  startTreatment: string;

  @Column({
    name: 'end_Treatment',
    type: "date",
    nullable: false,
  })
  endTreatment: string;

  @Column({ name: "patientId", type: "uuid", nullable: false })
  patientId: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId', referencedColumnName: 'id' })
  patient: Patient;
}
