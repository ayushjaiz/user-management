import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAvailableTimeSlot {
    start: string;
    end: string;
}

export interface IUser {
    email: string;
    password: string;
    role: string;
    mobile_number: string;
    bio?: string;
    available_time: IAvailableTimeSlot[];
}

export interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const AvailableTimeSchema = new Schema<IAvailableTimeSlot>(
    {
        start: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Validates HH:mm format
        },
        end: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },
    },
    { _id: false }
);

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

const UserSchema = new Schema<IUserDocument>(
    {
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        password: {
            type: Schema.Types.String,
            required: true,
            minlength: 6,
        },
        role: {
            type: Schema.Types.String,
            enum: Object.values(Role),
            default: Role.USER,
        },
        mobile_number: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            match: /^[0-9]{10}$/, // Ensures a 10-digit number
        },
        bio: {
            type: Schema.Types.String,
            trim: true,
            default: "",
        },
        available_time: {
            type: [AvailableTimeSchema], // Array of time slots
            default: [],
        },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
