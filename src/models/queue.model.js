import mongoose, { Schema } from "mongoose"
import ApiError from "../utils/ApiError.js"

const counterSchema = new Schema(
    {
        date: {
            type: String,
            required: true,
            unique: true
        },
        seq: {
            type: Number,
            default: 0
        }
    }
);

const Counter = mongoose.model("Counter", counterSchema);

const queueSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: "Patient"
        },
        queueNumber: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["waiting", "with_doctor", "completed", "cancelled"],
            default: "waiting"
        },
        assignedDoctor: {
            type: Schema.Types.ObjectId,
            ref: "Doctor"
        }
    },
    {
        timestamps: true
    }
);

// Pre-save hook to generate queueNumber automatically
queueSchema.pre("save", async function(next) {
    if (this.queueNumber) {
        return next();
    }

    const today = new Date().toISOString().split("T")[0];  //YYYY-MM-DD

    try {
        const counter = await Counter.findOneAndUpdate(
            {
                date: today
            },
            {
                $inc: {
                    seq: 1
                }
            },
            {
                upsert: true,
                new: true
            }
        );
    
        this.queueNumber = counter.seq;
        next();
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating queueNumber");
    }
})

export const Queue = mongoose.model("Queue", queueSchema);