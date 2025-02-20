import { createUserAchievement, getAllUserAchievements, updateUserAchievement, deleteUserAchievement, getOneAchievement} from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";
import { remoteUpload } from "../middlewares/upload.js";

const achievementRouter = Router()

achievementRouter.post('/users/achievements', checkUserSession, remoteUpload.single('image'),createUserAchievement)
achievementRouter.get('/users/achievements', checkUserSession, getAllUserAchievements)
achievementRouter.get('/users/achievements/:id', checkUserSession, getOneAchievement)
achievementRouter.patch('/users/achievements/:id', checkUserSession, updateUserAchievement)
achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteUserAchievement)

export default achievementRouter;