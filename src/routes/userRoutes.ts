import express from "express";
import { updateProfile } from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { Role } from "../models/user.model";

const router = express.Router();

router.put("/user/:id",
    authenticate,
    updateProfile
);

export default router;
