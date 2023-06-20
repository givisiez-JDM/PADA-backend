import { myHealthSchema } from "../utils/validations";
import { AppDataSource } from "../database/data-source";
import { ErrorTypes } from "../errors/catalog";
import { HealthReport } from '../database/entity/HealthReport';
import { randomUUID } from "node:crypto";

export default class HealthReportService {

    createHealthReport = async (
        generalHealth: string,
        date: string,
        time: string,
        patientId: string
    ): Promise<HealthReport> => {
        myHealthSchema({ generalHealth, date, time, patientId })

        const newReport = await AppDataSource.createQueryBuilder()
            .insert()
            .into(HealthReport)
            .values({
                id: randomUUID(),
                generalHealth,
                date,
                time,
                patientId
            })
            .execute();

        const insertedHealthReport = await AppDataSource.getRepository(HealthReport)
            .createQueryBuilder("healthReport")
            .where("healthReport.id = :id", { id: newReport.identifiers[0].id })
            .select([
                "healthReport.id",
                "healthReport.generalHealth",
                "healthReport.date",
                "healthReport.time",
                "healthReport.patientId",
            ])
            .getOne();

        return insertedHealthReport;
    }

    findById = async (id: string): Promise<HealthReport> => {
        const report = await AppDataSource.getRepository(HealthReport)
            .createQueryBuilder("healthReport")
            .where("healthReport.id = :id", { id })
            .select([
                "healthReport.id",
                "healthReport.generalHealth",
                "healthReport.date",
                "healthReport.time",
                "healthReport.patientId",])
            .getOne();
        if (!report) throw new Error(ErrorTypes.ReportNotFound);
        return report;
    }

    updateReport = async (
        id: string,
        generalHealth: string,
        date: string,
        time: string,
        patientId: string
    ): Promise<object> => {
        myHealthSchema({ generalHealth, date, time, patientId });

        const report = await AppDataSource.createQueryBuilder()
            .update(HealthReport)
            .set({
                generalHealth,
                date,
                time
            })
            .where("health_report.id = :id", { id })
            .execute();
        if (!report.affected) throw new Error(ErrorTypes.ReportNotFound);
        return { id, generalHealth, date, time, patientId };
    }

    list = async (): Promise<HealthReport[]> => {
        const reports = await AppDataSource.getRepository(HealthReport)
            .createQueryBuilder("healthReport")
            .select([
                "healthReport.id",
                "healthReport.generalHealth",
                "healthReport.date",
                "healthReport.time",
                "healthReport.patientId",
            ])
            .getMany();
        return reports;
    };

    deleteReport = async (id: string): Promise<object> => {
        const report = await AppDataSource.getRepository(HealthReport)
            .createQueryBuilder()
            .delete()
            .where("health_report.id = :id", { id })
            .execute();
        if (!report.affected) throw new Error(ErrorTypes.ReportNotFound);
        return { status: "Health Report deleted", id };
    };
}