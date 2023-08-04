import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Patient } from "./Patient";
import { Allergies, Method } from "../../interfaces/ITreatment";

@Entity()
export abstract class Treatment {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    type: "enum",
    enum: Allergies,
    array: true,
    nullable: false,
  })
  allergies: string[];

  @Column({
    type: "enum",
    enum: Method,
    nullable: false,
  })
  method: string;

  @Column({
    type: "boolean", 
    nullable: false
  })
  active: boolean;

  @Column({ name: "patientId", type: "uuid", nullable: false })
  patientId: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId', referencedColumnName: 'id' })
  patient: Patient;
}
