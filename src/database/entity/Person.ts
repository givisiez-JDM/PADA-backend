import { Column, Entity, PrimaryColumn } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  DOCTOR = "doctor",
  PATIENT = "patient",
}

@Entity()
export abstract class Person {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: "varchar", nullable: true })
  photo: string;

  @Column({
    type: "enum",
    enum: UserRole,
    nullable: false,
  })
  role: UserRole;

  @Column({ name: 'created_at', type: "timestamptz", default: "now()" })
  createdAt: Date;

	@Column({ name: 'updated_at', type: "timestamptz", nullable: true })
  updatedAt: Date;
}
