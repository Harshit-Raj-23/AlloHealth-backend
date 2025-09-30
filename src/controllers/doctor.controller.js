import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";


// Create doctor
const createDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.create(req.body);

    return res
           .status(201)
           .json(
                new ApiResponse(
                    201,
                    doctor,
                    "Doctor created"
                )
            );
});


// Get all doctors (with optional filters)
const getDoctors = asyncHandler(async (req, res) => {
    const { specialization, location } = req.query;

    const filter = {};
    
    if (specialization) {
        filter.specialization = specialization;
    }
    
    if (location) {
        filter.location = location;
    }

    const doctors = await Doctor.find(filter);

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    doctors,
                    "Doctors fetched"
                )
           );
});


// Get single doctor
const getDoctorById = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    doctor,
                    "Doctor fetched"
                )
           );
});


// Update doctor
const updateDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true 
        }
    );

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }
    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    doctor,
                    "Doctor updated"
                )
           );
});


// Delete doctor
const deleteDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    {},
                    "Doctor deleted"
                )
           );
});


export {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};