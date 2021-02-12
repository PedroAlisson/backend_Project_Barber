import { startOfHour } from "date-fns";
import Appointment from "../models/AppointmentsModel";
import { getCustomRepository } from "typeorm";
import AppointmentsRepository from "../repository/AppointmentsRepository";
import AppError from "../errors/AppError";

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const parsedStartDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      parsedStartDate
    );

    if (findAppointmentInSameDate) {
      throw AppError("This appoinment is already booket");
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: parsedStartDate,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
