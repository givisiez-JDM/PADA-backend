import { Entity, ManyToOne } from "typeorm"
import { Person } from "./Person"
import { Doctor } from "./Doctor"


@Entity()
export class Patient extends Person {
    @ManyToOne(() => Doctor, (doctor) => doctor.patients)
    doctor: Doctor
}