import express from "express";
import appointmentRouter from "./routes/appointments.routes";

const app = express();
app.use(express.json());
app.use("/appointments", appointmentRouter);
app.listen(3333, () => console.log("Server started on port 3333"));
