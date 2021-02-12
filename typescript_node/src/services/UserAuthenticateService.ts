import { getRepository } from "typeorm";
import authConfig from "../config/auth";
import { sign } from "jsonwebtoken";
import AppError from "../errors/AppError";
import User from "../models/UsersModel";
import { compare } from "bcryptjs";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class UserAuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Incorrect email and password", 401);
    }

    const userMathed = await compare(password, user.password);

    if (!userMathed) {
      throw new AppError("Incorrect email and password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default UserAuthenticateService;
