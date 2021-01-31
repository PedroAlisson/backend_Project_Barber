import { startOfHour } from "date-fns";
import Appointment from "../models/AppointmentsModel";
import AppointmentsRepository from "../repository/AppointmentsRepository";

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const parsedStartDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      parsedStartDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appoinment is already booket");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: parsedStartDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
