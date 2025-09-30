import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"]
        },
        dob: {
            type: Date
        },
        notes: {
            type: String  // extra info if needed
        }
    },
    {
        timestamps: true
    }
);

export const Patient = mongoose.model("Patient", patientSchema);