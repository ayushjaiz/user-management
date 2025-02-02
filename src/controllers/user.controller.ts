import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const id = req?.user?.id;

        const updatedUser = await UserModel.findByIdAndUpdate((id), req);

        if (!updatedUser) {
            res.status(404).send({ status: false, message: "User not found" });
            return;
        }

        res.send({
            status: true,
            message: "Profile updated sucessfully",
            data: updatedUser,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
};;