import React, { useState, useEffect } from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    // Reset loading and error states when imageUrl changes
    setIsLoading(true);
    setLoadError(false);
    
    // Create a timer to simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [imageUrl]);

  if (!imageUrl) return null;

  // Enhanced PDF detection - check for both file extension and URL content
  const isPdf = 
    imageUrl.toLowerCase().endsWith('.pdf') || 
    imageUrl.toLowerCase().includes('/pdf/') ||
    imageUrl.toLowerCase().includes('application/pdf');

  // Handle PDF load error
  const handlePdfError = () => {
    setLoadError(true);
    setIsLoading(false);
    console.error("Failed to load PDF:", imageUrl);
  };
  
  // Handle image load success
  const handleLoadSuccess = () => {
    setIsLoading(false);
    setLoadError(false);
  };
  
  // Zoom controls
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 20, 200));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 20, 60));
  const resetZoom = () => setZoomLevel(100);

  return (
    <div className="resume-modal" style={styles.modalOverlay}>
      <div className="modal-content" style={styles.modalContent}>
        <span className="close" onClick={onClose} style={styles.closeButton}>
          &times;
        </span>
        <h3 style={styles.modalTitle}>Resume Preview</h3>
        
        {/* Loading indicator */}
        {isLoading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Loading document...</p>
          </div>
        )}
        
        {isPdf ? (
          <div style={styles.pdfContainer}>
            {loadError ? (
              <div style={styles.errorContainer}>
                <p style={styles.errorText}>Unable to display PDF.</p>
                <p style={styles.errorSubtext}>Please download the file to view it.</p>
              </div>
            ) : (
              <>
                <div style={styles.zoomControls}>
                  <button onClick={zoomOut} style={styles.zoomButton}>-</button>
                  <span style={styles.zoomText}>{zoomLevel}%</span>
                  <button onClick={zoomIn} style={styles.zoomButton}>+</button>
                  <button onClick={resetZoom} style={styles.resetButton}>Reset</button>
                </div>
                <object
                  data={imageUrl}
                  type="application/pdf"
                  width={`${zoomLevel}%`}
            height="500px"
                  style={{ 
                    border: "none", 
                    display: isLoading ? "none" : "block" 
                  }}
                  onLoad={handleLoadSuccess}
                  onError={handlePdfError}
                >
                  <div style={styles.errorContainer}>
                    <p style={styles.errorText}>Unable to display PDF.</p>
                    <p style={styles.errorSubtext}>Your browser may not support PDF embedding.</p>
                  </div>
                </object>
              </>
            )}
            <div style={styles.actionButtons}>
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.downloadLink}
                download="resume.pdf"
              >
                Download PDF
              </a>
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.viewLink}
              >
                Open in New Tab
              </a>
            </div>
          </div>
        ) : (
          <div style={styles.imageContainer}>
            <div style={styles.zoomControls}>
              <button onClick={zoomOut} style={styles.zoomButton}>-</button>
              <span style={styles.zoomText}>{zoomLevel}%</span>
              <button onClick={zoomIn} style={styles.zoomButton}>+</button>
              <button onClick={resetZoom} style={styles.resetButton}>Reset</button>
            </div>
            <img 
              src={imageUrl} 
              alt="resume" 
              style={{ 
                maxWidth: `${zoomLevel}%`, 
                maxHeight: "500px",
                display: isLoading ? "none" : "block" 
              }}
              onLoad={handleLoadSuccess}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.png";
                setIsLoading(false);
                setLoadError(true);
                console.error("Failed to load image:", imageUrl);
              }} 
            />
            <div style={styles.actionButtons}>
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.viewLink}
              >
                View Full Size
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced styles for a better UI
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
    maxHeight: "90vh",
    overflow: "auto",
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#333",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "28px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#333",
    zIndex: 2,
  },
  pdfContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    overflow: "auto",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    overflow: "auto",
  },
  actionButtons: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
    justifyContent: "center",
  },
  downloadLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 15px",
    backgroundColor: "#00f9ff",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    textTransform: "uppercase",
    fontSize: "14px",
  },
  viewLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 15px",
    backgroundColor: "#333",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    textTransform: "uppercase",
    fontSize: "14px",
  },
  errorContainer: {
    padding: "40px 20px",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    textAlign: "center",
    width: "100%",
    marginBottom: "15px",
  },
  errorText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: "10px",
  },
  errorSubtext: {
    fontSize: "14px",
    color: "#777",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center",
  },
  spinner: {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    borderTop: "4px solid #00f9ff",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    marginBottom: "15px",
  },
  zoomControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0",
    gap: "10px",
  },
  zoomButton: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#333",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  resetButton: {
    padding: "3px 10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#777",
    color: "white",
    fontSize: "12px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  zoomText: {
    fontSize: "14px",
    width: "60px",
    textAlign: "center",
  }
};

// Add keyframes for spinner animation to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default ResumeModal;

