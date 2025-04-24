// this is applicationController.js
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  console.log("========== APPLICATION SUBMISSION STARTED ==========");
  console.log("Request body:", req.body);
  console.log("Files received:", req.files ? Object.keys(req.files) : "No files");

  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  
  // Enhanced file information logging
  console.log("============ FILE UPLOAD DETAILS ============");
  console.log("File MIME type:", resume.mimetype);
  console.log("File name:", resume.name);
  console.log("File size:", resume.size);
  console.log("File tempFilePath:", resume.tempFilePath);
  
  // Get file extension
  const fileExt = path.extname(resume.name).toLowerCase();
  console.log("File extension:", fileExt);
  
  // Accept files based on extension and MIME type
  const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.webp'];
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"];
  
  if (!allowedMimeTypes.includes(resume.mimetype) && !allowedExtensions.includes(fileExt)) {
    return next(
      new ErrorHandler(`Invalid file type (${resume.mimetype}, ${fileExt}). Please upload a PNG, JPG, or PDF file.`, 400)
    );
  }
  
  // Validate required fields
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  if (!name || !email || !coverLetter || !phone || !address || !jobId) {
    return next(new ErrorHandler("Please fill all required fields.", 400));
  }
  
  // Validate job exists
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  
  try {
    console.log("Starting Cloudinary upload...");
    
    // Check if temp file exists
    if (!fs.existsSync(resume.tempFilePath)) {
      return next(new ErrorHandler("Temporary file not found. Upload failed.", 500));
    }
    
    // Special handling for PDF files
    let cloudinaryResponse;
    const uploadOptions = {
      folder: "resumes",
      resource_type: "auto"
    };
    
    // For PDFs, ensure resource_type is set to auto or raw
    if (fileExt === '.pdf' || resume.mimetype === 'application/pdf') {
      console.log("Detected PDF file, using appropriate resource_type: auto");
    }
    
      cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
      uploadOptions
      );
    
    console.log("Cloudinary upload result:", cloudinaryResponse.secure_url);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
      return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
    }
    
    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };

    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };
    
    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return next(new ErrorHandler(`Upload failed: ${error.message}`, 500));
  }
});

export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
