import { randomUUID } from "node:crypto";
import { AppDataSource } from "../database/data-source";
import { Phase } from "../database/entity/Phase";
import { Treatment } from "../database/entity/Treatment";
import { ErrorTypes } from "../errors/catalog";
import { phaseRegistrationSchema, phaseUpdateSchema } from "../utils/validations";

export default class TreatmentService {
  phaseRegistration = async (
    treatmentId: string,
    phaseNumber: number,
    dosage: string,
    frequency: string,
    startTreatment: string,
    endTreatment: string,
    active: boolean
  ) => {
    phaseRegistrationSchema({
      treatmentId,
      phaseNumber,
      dosage,
      frequency,
      startTreatment,
      endTreatment,
      active,
    })

  const alreadyPhaseExists = await AppDataSource.getRepository(Phase)
    .createQueryBuilder("phase")
    .where("phase.phaseNumber = :phaseNumber and phase.treatmentId = :treatmentId", { phaseNumber, treatmentId })
    .getOne();
  if (alreadyPhaseExists) throw new Error(ErrorTypes.ConflictPhaseError);

    const phase = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Phase)
      .values({
        id: randomUUID(),
        phaseNumber,
        dosage,
        frequency,
        startTreatment,
        endTreatment,
        treatmentId,
        active,
      })
      .execute();

    const insertedPhase = await AppDataSource.getRepository(Phase)
      .createQueryBuilder("phase")
      .where("phase.id = :id", { id: phase.identifiers[0].id })
      .select("phase.id")
      .getOne();

    const phaseId = insertedPhase.id;

    return {
      phase: {
        phaseId,
        phaseNumber,
        dosage,
        frequency,
        startTreatment,
        endTreatment,
        active,
      },
    }
  }

  updatePhase = async (
    phaseId: string,
    dosage: string,
    phaseNumber: number,
    frequency: string,
    startTreatment: string,
    endTreatment: string,
    active: boolean
  ): Promise<object> => {
    phaseUpdateSchema({
      phaseNumber,
      dosage,
      frequency,
      startTreatment,
      endTreatment,
      active,
    })

    const phase = await AppDataSource.createQueryBuilder()
      .update(Phase)
      .set({
        phaseNumber,
        dosage,
        frequency,
        startTreatment,
        endTreatment,
        active,
      })
      .where("id = :id", { id: phaseId })
      .execute();
    if (!phase.affected) throw new Error(ErrorTypes.PhaseNotFound);
    return { phaseId, phaseNumber, dosage, frequency, startTreatment, endTreatment, active };
  };

  listPhasesByTreatmentId = async (treatmentId: string): Promise<Phase[]> => {
    const phases = await AppDataSource.getRepository(Phase)
      .createQueryBuilder("phase")
      .where("phase.treatmentId = :treatmentId", { treatmentId })
      .select([
        "phase.id",
        "phase.phaseNumber",
        "phase.startTreatment",
        "phase.endTreatment",
        "phase.frequency",
        "phase.dosage",
        "phase.active",
      ])
      .getMany();
    return phases;
  };

  findPhaseById = async (phaseId: string): Promise<Phase> => {
    const phase = await AppDataSource.getRepository(Phase)
      .createQueryBuilder("phase")
      .where("phase.id = :id", { id: phaseId })
      .select([
        "phase.id",
        "phase.phaseNumber",
        "phase.startTreatment",
        "phase.endTreatment",
        "phase.frequency",
        "phase.dosage",
        "phase.active",
      ])
      .getOne();
    if (!phase) throw new Error(ErrorTypes.PhaseNotFound);
    return phase;
  };

  deletePhase = async (phaseId: string): Promise<object> => {
    const phase = await AppDataSource.getRepository(Phase)
      .createQueryBuilder()
      .delete()
      .where("phase.id = :id", { id: phaseId })
      .execute();
    if (!phase.affected) throw new Error(ErrorTypes.PhaseNotFound);
    return { status: "Phase deleted", phaseId };
  };

}
