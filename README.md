# Upadhi - Professional Job Portal

![Upadhi](frontend/public/heroS.jpg)

## About Upadhi

Upadhi is a powerful job portal application developed by [Kayala Durga Eswar](https://github.com/KayalaDurgaEswar). Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this platform was designed from the ground up to create a seamless connection between job seekers and employers.

## Key Features

### For Job Seekers
- **Secure User Authentication** - Protected login and registration system
- **Personalized Profiles** - Create and customize your professional profile
- **Intelligent Job Search** - Advanced filtering by skills, location, and company
- **Application Dashboard** - Track all your applications in one place
- **Resume Management** - Easily upload and update your resume

### For Employers
- **Employer Dashboard** - Manage job postings and applications
- **Detailed Job Creation** - Post comprehensive job descriptions
- **Applicant Tracking** - Review and manage candidate applications
- **Candidate Evaluation** - Sort and filter applications efficiently

## Technology Stack

This application was built using modern technologies:

### Frontend
- React.js with hooks and context API
- Modern responsive CSS design
- Axios for API integration
- React Router for navigation

### Backend
- Node.js with Express framework
- MongoDB database
- JWT for secure authentication
- Multer for file handling
- Custom middleware solutions

## Setup Instructions

### Prerequisites
- Node.js (v14.0.0 or later)
- MongoDB account
- npm package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/KayalaDurgaEswar/Upadhi.git
   cd Upadhi
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `config/config.env` file with:
   ```env
   PORT=4000
   DB_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=5
   FRONTEND_URL=http://localhost:5173
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the application**
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   
   Access the application at `http://localhost:5173`

## Project Development

This project was designed and developed entirely by [Kayala Durga Eswar](https://github.com/KayalaDurgaEswar) as a showcase of full-stack development skills using the MERN stack. Every aspect of this application—from concept and architecture to implementation—was created by me.

The development process involved:
- Detailed planning and architecture design
- Custom backend API development
- Responsive frontend implementation
- Security implementation with JWT
- Testing and performance optimization

## License

This project is licensed under the MIT License.

---

© 2025 Kayala Durga Eswar | All Rights Reserved

⭐ Please star the repository if you find it useful! ⭐ 