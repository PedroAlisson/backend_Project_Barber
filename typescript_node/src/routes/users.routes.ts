import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import multer from "multer";
import uploadConfig from "../config/upload";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import UpdateAvatarUserService from "../services/UpdateAvatarUserService";

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticate,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateAvatarUserService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  }
);
export default usersRouter;
