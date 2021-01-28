import { uuid } from "uuidv4";
class Appointment {
  id: string;
  provider: string;
  date: Date;

  constructor(provider: string, date: Date) {
    this.id = uuid();
    this.date = date;
    this.provider = provider;
  }
}

export default Appointment;
