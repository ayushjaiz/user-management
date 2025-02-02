import express from "express";
import { updateProfile, updateRole } from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { Role } from "../models/user.model";

const router = express.Router();

router.patch(
    "user/:id/role",
    authenticate,
    authorize([Role.ADMIN]),
    updateRole
);

router.patch("/user/:id",
    authenticate,
    authorize([Role.ADMIN, Role.USER]),
    updateProfile
);

export default router;
