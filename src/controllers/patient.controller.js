import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Patient } from "../models/patient.model.js";


// Create patient
const createPatient = asyncHandler(async (req, res) => {
    const patient = await Patient.create(req.body);

    return res
           .status(201)
           .json(
                new ApiResponse(
                    201,
                    patient,
                    "Patient created"
                )
           );
});


// Get all patients
const getPatients = asyncHandler(async (_, res) => {
    const patients = await Patient.find();

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    patients
                )
           );
});


// Get single patient
const getPatientById = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        throw new ApiError(404, "Patient not found");
    }

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    patient
                )
           );
});


// Update patient
const updatePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );

    if (!patient) {
        throw new ApiError(404, "Patient not found");
    }

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    patient,
                    "Patient updated"
                )
           );
});


// Delete patient
const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
        throw new ApiError(404, "Patient not found");
    }

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    {},
                    "Patient deleted"
                )
           );
});

export {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
}