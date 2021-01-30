import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";

import AppointmentsRepository from "../repository/AppointmentsRepository";

const appointmentRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.get("/", (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  console.log(parsedDate);

  const findAppointmentInSameDate = appointmentsRepository.findByDate(date);

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: "This appoinment is already booket" });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRouter;
