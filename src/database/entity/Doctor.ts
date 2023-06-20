import { Column, Entity, OneToMany } from "typeorm";
import { Patient } from "./Patient";
import { Person } from "./Person";

@Entity()
export class Doctor extends Person {
  @Column({ type: "varchar", nullable: true })
  about: string;

  @Column({ type: "varchar", unique: true, nullable: false, length: 13 })
  CRM: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  specialty: string;

  @OneToMany(() => Patient, (patient) => patient.doctor, { cascade: true })
  patients: Patient[];
}
