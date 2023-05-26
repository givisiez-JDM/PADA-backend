import { Entity, OneToMany } from "typeorm"
import { Person } from "./Person"
import { Patient } from "./Patient"


@Entity()
export class Doctor extends Person {
    @OneToMany(() => Patient, (patient) => patient.doctor)
    patients: Patient[]
}