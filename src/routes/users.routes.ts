import express from "express";
import { sendNotification, updateProfile } from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { Role } from "../models/user.model";

const router = express.Router();

router.put("/",
    authenticate,
    updateProfile
);

router.post(
    "notifications/send",
    authenticate,
    authorize([Role.ADMIN, Role.USER]),
    sendNotification,
);

export default router;
