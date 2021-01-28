import Appointment from "../models/AppointmentsModel";
import { isEqual } from "date-fns";

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentDate = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );

    return findAppointmentDate || null;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
