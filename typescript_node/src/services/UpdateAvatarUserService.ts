import { getRepository } from "typeorm";
import User from "../models/UsersModel";
import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";
import path from "path";
import fs from "fs";

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateAvatarUserService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError("Only authenticated user can chage avatar", 401);
    }

    if (user.avatar) {
      const userFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userFilePath);
      }
    }

    user.avatar = avatarFileName;
    await userRepository.save(user);
    return user;
  }
}

export default UpdateAvatarUserService;
