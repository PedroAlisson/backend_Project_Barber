import { getRepository } from "typeorm";
import User from "../models/UsersModel";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError";

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkExistEmail = await usersRepository.findOne({
      where: { email },
    });

    if (checkExistEmail) {
      throw AppError("Email and is already");
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
