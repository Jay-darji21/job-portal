# Job Portal Application

A full-stack job portal application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

### For Job Seekers
- User registration and authentication
- Browse and search for jobs
- Apply for jobs with resume upload
- Track application status
- Update profile information

### For Recruiters
- Post job openings
- Manage company information
- View and manage job applications
- Accept or reject applicants

## Tech Stack

### Frontend
- React.js
- Redux for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Cloudinary for file storage

## Installation

### Prerequisites
- Node.js
- MongoDB
- Git

### Setup Instructions

1. Clone the repository
```
git clone https://github.com/Jay-darji21/job-portal.git
cd job-portal
```

2. Install dependencies for backend
```
cd Backend
npm install
```

3. Install dependencies for frontend
```
cd ../Frontend
npm install
```

4. Create a .env file in the Backend directory with the following variables:
```
PORT=3535
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

5. Start the backend server
```
npm run dev
```

6. Start the frontend development server
```
cd ../Frontend
npm run dev
```

7. Open your browser and navigate to http://localhost:5173

## Project Structure

- `/Backend` - Contains the Node.js/Express server code
- `/Frontend` - Contains the React.js client code

## Contributors

- [Jay Darji](https://github.com/Jay-darji21)
