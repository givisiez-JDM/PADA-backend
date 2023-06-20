import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Patient } from "./entity/Patient";
import { Doctor } from "./entity/Doctor";
import { Treatment } from "./entity/Treatment";
import { HealthReport } from "./entity/HealthReport";

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: 'localhost',
  host: process.env.HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Patient, Doctor, Treatment, HealthReport],
  migrations: [
    "src/database/migration/*.ts"
  ],
  ssl: { rejectUnauthorized: false },
  subscribers: [],
});
