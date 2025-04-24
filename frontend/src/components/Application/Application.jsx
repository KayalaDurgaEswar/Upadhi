import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Fetch job details to check if the current user is the job poster
  useEffect(() => {
    const fetchJobDetails = async () => {
      setPageLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true,
        });
        setJobDetails(data.job);
        
        // If user posted this job, redirect them
        if (data.job && user && data.job.postedBy === user._id) {
          toast.error("You cannot apply to your own job posting");
          navigateTo("/job/getall");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job details");
        navigateTo("/job/getall");
      } finally {
        setPageLoading(false);
      }
    };

    if (isAuthorized && user && id) {
      fetchJobDetails();
    }
  }, [id, isAuthorized, user, navigateTo]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      setResume(null);
      setFileError("");
      return;
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const fileType = file.type;
    
    if (!allowedTypes.includes(fileType)) {
      setFileError("Please upload a PDF, JPG, or PNG file only");
      setResume(null);
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size should be less than 5MB");
      setResume(null);
      return;
    }
    
    setFileError("");
    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume before submitting.");
      return;
    }

    if (fileError) {
      toast.error(fileError);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Redirect if user is not authorized or is an employer
  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
    return null;
  }

  // Show loading indicator while checking if user can apply
  if (pageLoading) {
    return (
      <section className="application">
        <div className="container">
          <h3>Application Form</h3>
          <div style={{ color: "var(--text-light)", textAlign: "center", marginTop: "50px" }}>
            Loading job details...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
          <div>
            <label
              style={{
                textAlign: "start",
                display: "block",
                fontSize: "20px",
                color: "var(--text-light)",
                marginBottom: "10px",
              }}
            >
              Select Resume (PDF, JPG, PNG - Max 5MB)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={handleFileChange}
              style={{ width: "100%", color: "var(--text-light)" }}
              required
            />
            {fileError && (
              <p style={{ fontSize: "14px", marginTop: "5px", color: "#d9534f" }}>
                {fileError}
              </p>
            )}
            {resume && !fileError && (
              <p style={{ fontSize: "14px", marginTop: "8px", color: "#666" }}>
                Selected File: {resume.name} ({(resume.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
