import { Router } from "express";
import UserAuthenticateService from "../services/UserAuthenticateService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UserAuthenticateService();

  const { user, token } = await usersRepository.execute({ email, password });

  delete user.password;
  return response.json({ user, token });
});

export default sessionsRouter;
