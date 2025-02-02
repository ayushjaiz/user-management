import { Request, Response } from "express";
import { Role, UserModel } from "../models/user.model";

export const updateRole = async (req: Request, res: Response) => {
    try {
        const id = req?.user?.id;
        const { role } = req.body; // Expected "user" or "admin"

        if (!Object.values(Role).includes(role)) {
            res.status(400).send({ status: false, error: "Invalid role" });
            return;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, { role }, { new: true });

        if (!updatedUser) {
            res.status(404).send({ status: false, message: "User not found" });
            return;
        }

        res.send({
            status: true,
            message: "User role updated successfully",
            data: updatedUser,
        });
    } catch (error: any) {
        res.status(400).send({ status: false, error: error.message });
    }
}