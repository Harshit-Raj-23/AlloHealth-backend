import mongoose, { Schema } from "mongoose"

const appointmentSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },
        doctor: {
            type: Schema.Types.ObjectId,
            ref: "Doctor",
            required: true
        },
        slot: {
            type: Date,  // exact datetime of the appointment
            required: true
        },
        status: {
            type: String,
            enum: ["booked", "cancelled", "completed"],
            default: "booked"
        },
        createdBy: {
            type: Schema.Types.ObjectId,  // Staff who created it
            ref: "User",
        }
    },
    {
        timestamps: true
    }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);