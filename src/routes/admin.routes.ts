import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { Role } from "../models/user.model";
import { updateRole } from "../controllers/admin.controller";

const router = express.Router();

router.patch(
    "/users/:user-id/role",
    authenticate,
    authorize([Role.ADMIN]),
    updateRole
);

router.post(
    "notifications/send",
    authenticate,
    authorize([Role.ADMIN]),
    updateRole
);

export default router;
