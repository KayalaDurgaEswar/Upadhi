import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  // Check if the uploaded file is a PDF
  const isPdf = imageUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="resume-modal" style={styles.modalOverlay}>
      <div className="modal-content" style={styles.modalContent}>
        <span className="close" onClick={onClose} style={styles.closeButton}>
          &times;
        </span>
        {isPdf ? (
          <iframe
            src={imageUrl}
            title="Resume PDF"
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
        ) : (
          <img src={imageUrl} alt="resume" style={{ maxWidth: "100%", maxHeight: "500px" }} />
        )}
      </div>
    </div>
  );
};

// Optional inline styles for quick styling
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "800px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "24px",
    cursor: "pointer",
  },
};

export default ResumeModal;

