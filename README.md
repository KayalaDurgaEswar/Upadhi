# Upadhi - Job Portal Application

![Upadhi Banner](frontend/public/heroS.jpg)

## 📋 Overview

Upadhi is a comprehensive job portal application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform connects job seekers with employers, providing a seamless experience for job searching, applications, and recruitment.

## ✨ Features

### For Job Seekers
- **User Authentication** - Secure signup/login with JWT
- **Profile Management** - Create and update professional profiles
- **Job Search** - Browse and filter job listings by various parameters
- **Application Tracking** - Monitor application status in real-time
- **Resume Management** - Upload and manage resumes

### For Employers
- **Company Profiles** - Create and manage company information
- **Job Posting** - Create detailed job listings
- **Applicant Management** - Review and process job applications
- **Candidate Filtering** - Sort and filter applicants based on qualifications

### Platform Features
- **Responsive Design** - Seamless experience across devices
- **Real-time Updates** - Instant notifications for application status
- **Advanced Search** - Find the perfect job or candidate quickly

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation and routing
- **Context API** - State management
- **Axios** - API requests
- **CSS** - Styling and responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcrypt** - Password security
- **Multer** - File uploads

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- MongoDB Atlas account or local MongoDB installation
- NPM or Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KayalaDurgaEswar/Upadhi.git
   cd Upadhi
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `config/config.env` file with the following variables:
   ```env
   PORT=4000
   DB_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=5
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Running the Application**
   
   Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   
   Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   
   Access the application at `http://localhost:5173`

## 📱 Usage

1. **Register/Login** - Create an account or login with existing credentials
2. **Create Profile** - Complete your profile information
3. **Browse Jobs** - Search for jobs based on skills, location, etc.
4. **Apply for Jobs** - Submit applications with your resume
5. **Track Applications** - Monitor the status of your job applications

## 📸 Screenshots

<div style="display: flex; justify-content: space-between;">
    <img src="frontend/public/screenshots/home.png" alt="Home Page" width="30%"/>
    <img src="frontend/public/screenshots/jobs.png" alt="Jobs Page" width="30%"/>
    <img src="frontend/public/screenshots/profile.png" alt="Profile Page" width="30%"/>
</div>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Special thanks to all contributors who have helped shape Upadhi
- Built with passion by [Kayala Durga Eswar](https://github.com/KayalaDurgaEswar)

---

⭐ **Please star this repository if you find it useful!** ⭐

