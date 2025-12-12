# Form Integration Full-Stack Application

A complete full-stack application with user authentication and contact form.

## 🚀 Features

- User Registration & Login with JWT
- Contact Form Submission
- Password Hashing with bcrypt
- MongoDB Database
- React Frontend
- Express Backend

## 🛠️ Tech Stack

**Frontend:**
- React
- React Router
- Axios
- React Toastify

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs

## 📁 Project Structure
```
form-integration-project/
├── backend/          # Express API
└── frontend/         # React App
```

## 🔧 Local Development

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

- Backend: Railway
- Frontend: Vercel
- Database: MongoDB Atlas

## 📝 API Endpoints

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get all contacts

## 👨‍💻 Author

Your Name

## 📄 License

MIT