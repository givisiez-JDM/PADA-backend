import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Doctor } from "./Doctor";
import { Person } from "./Person";
import { Treatment } from "./Treatment";

@Entity()
export class Patient extends Person {
  @Column({ type: "varchar", nullable: true, length: 14 })
  telephone: string;

  @Column({ name: "birth_date", type: "date", nullable: false })
  birthDate: Date;

  @Column({ name: "doctorId", type: "uuid", nullable: false })
  doctorId: string;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @OneToMany(() => Treatment, (treatment) => treatment.patient)
  treatments: Treatment[]
}
