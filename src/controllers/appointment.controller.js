import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Appointment } from "../models/appointment.model.js";


// Book appointment
const createAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.create({
        ...req.body,
        createdBy: req.user._id 
    });

    return res
           .status(201)
           .json(
                new ApiResponse(
                    201,
                    appointment,
                    "Appointment booked"
                )
           );
});


// Get all appointments
const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find().populate(
        "patient doctor"
    );

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    appointments
                )
           );
});


// Update appointment (reschedule or change status)
const updateAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }
    
    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    appointment,
                    "Appointment updated"
                )
           );
});


// Cancel appointment
const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    {},
                    "Appointment cancelled"
                )
           );
});


export {
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
}