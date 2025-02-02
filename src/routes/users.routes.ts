import express from "express";
import { updateProfile } from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.put("/user/:id",
    authenticate,
    updateProfile
);

export default router;
