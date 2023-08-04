import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Treatment } from "./Treatment";
import { Dosage, Frequency } from "../../interfaces/ITreatment";

@Entity()
export abstract class Phase {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    name: 'phase_number',
    type: "integer",
    nullable: false,
  })
  phaseNumber: number;

  @Column({
    type: "enum",
    enum: Dosage,
    nullable: false,
  })
  dosage: string;

  @Column({
    type: "enum",
    enum: Frequency,
    nullable: false,
  })
  frequency: string;

  @Column({
    name: 'start_treatment',
    type: "date",
    nullable: false,
  })
  startTreatment: string;

  @Column({
    name: 'end_treatment',
    type: "date",
    nullable: false,
  })
  endTreatment: string;

  @Column({ nullable: false })
  active: boolean;

  @Column({ name: "treatmentId", type: "uuid", nullable: false })
  treatmentId: string;

  @ManyToOne(() => Treatment)
  @JoinColumn({ name: 'treatmentId', referencedColumnName: 'id' })
  treatment: Treatment;
}
