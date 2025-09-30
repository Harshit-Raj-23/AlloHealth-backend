import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Queue } from "../models/queue.model.js";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";

// Add patient to queue
const addToQueue = asyncHandler(async (req, res) => {
    const { patient, assignedDoctor } = req.body;

    if (!patient || !assignedDoctor) {
        throw new ApiError(400, "Patient and Doctor are required");
    }

    // Check if patient exists
    const patientExists = await Patient.findById(patient);
    if (!patientExists) {
        throw new ApiError(404, "Patient not found");
    }

    // Check if doctor exists
    const doctorExists = await Doctor.findById(assignedDoctor);
    if (!doctorExists) {
        throw new ApiError(404, "Doctor not found");
    }

    const queueEntry = await Queue.create({ patient, assignedDoctor });

    const populated = await queueEntry.populate(["patient", "assignedDoctor"]);

    return res
        .status(201)
        .json(new ApiResponse(201, populated, "Patient added to queue"));
});

// Get queue list
const getQueue = asyncHandler(async (req, res) => {
    const queue = await Queue.find()
        .populate("patient assignedDoctor")
        .sort({ createdAt: 1 });

    return res.status(200).json(new ApiResponse(200, queue));
});

// Update queue status
const updateQueue = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const validStatus = ["waiting", "with_doctor", "completed", "cancelled"];

    if (!validStatus.includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    const queueEntry = await Queue.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    ).populate("patient assignedDoctor");

    if (!queueEntry) {
        throw new ApiError(404, "Queue entry not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, queueEntry, "Queue updated"));
});

export { addToQueue, getQueue, updateQueue };
