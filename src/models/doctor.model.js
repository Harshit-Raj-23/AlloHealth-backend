import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        specialization: {
            type: String,  // e.g., "Cardiology"
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"]
        },
        location: {
            type: String
        },
        availability: [
            {
                day: {
                    type: Number,  // 0=Sunday, 6=Saturday
                    min: 0,
                    max: 6,
                    required: true
                },
                slots: [
                    {
                        start: {
                            type: String,  // "09:30"
                            required: true
                        },
                        end: {
                            type: String,  // "13:00"
                            required: true
                        }
                    }
                ]
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);