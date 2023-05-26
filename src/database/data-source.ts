import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Patient } from "./entity/Patient";
import { Doctor } from "./entity/Doctor";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: 'localhost',
  // host: process.env.HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Patient, Doctor],
  migrations: [],
  subscribers: [],
});
