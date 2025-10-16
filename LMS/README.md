# Umoja LMS

Full-stack Learning Management System tailored for the Umoja Mechanical Curriculum. The platform delivers mechanical engineering content, supports interactive lessons, and tracks learner progress for students preparing for FRC competitions.

## ✨ Feature Overview
- **Authentication & Roles** – JWT-based login/registration with student, instructor, and admin roles
- **Course Management** – Create, publish, edit, and delete courses with multi-lesson support
- **Interactive Lessons** – Track lesson completion and capture learner reflections
- **Progress Dashboard** – Students view active enrollments, completion status, and resume courses quickly
- **Responsive UI** – Modern, mobile-friendly React interface with protected routes
- **Flexible Persistence** – Uses configured MongoDB instance, with automatic fall-back to in-memory database for quick demos/tests

## 🧰 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 19, React Router 7, Axios |
| Backend    | Node.js 20, Express 4 |
| Database   | MongoDB via Mongoose 7 (falls back to mongodb-memory-server when `MONGO_URI` is absent) |
| Auth       | JSON Web Tokens, bcryptjs |

## 🚀 Quick Start

### 1. Clone & Install
```powershell
git clone <repository-url>
cd LMS
npm install
cd frontend
npm install
cd ..
```

### 2. Configure Environment
Create a `.env` file in the project root:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/umoja_lms
JWT_SECRET=replace-with-strong-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

> **Tip:** If `MONGO_URI` is left blank the backend will spin up an ephemeral in-memory MongoDB instance—perfect for demos but unsuitable for production.

### 3. Run the Stack

In two separate terminals:

**Backend**
```powershell
npm run dev
```

**Frontend**
```powershell
cd frontend
npm start
```

Visit `http://localhost:3000` to explore the LMS UI (proxied API calls target the backend on port `5001`).

## 📂 Key Project Structure

```
LMS/
├─ server.js                 # Backend entrypoint
├─ src/
│  ├─ app.js                 # Express app wiring
│  ├─ config/db.js           # Mongo/MongoMemoryServer connection logic
│  ├─ controllers/           # Auth, Course, Progress controllers
│  ├─ middleware/            # Auth + error handling helpers
│  ├─ models/                # Mongoose schemas (User, Course, Enrollment)
│  └─ routes/                # Modular Express routers
├─ frontend/
│  ├─ src/
│  │  ├─ components/         # Navbar, LessonList, CourseCard, etc.
│  │  ├─ context/            # AuthProvider + custom hook
│  │  ├─ pages/              # Login, Dashboard, Course views
│  │  └─ services/api.js     # Axios instance with token interceptor
│  └─ package.json           # Frontend scripts & dependencies
├─ .github/copilot-instructions.md
└─ README.md
```

## 🧪 Available Scripts

| Location  | Command                | Description |
|-----------|------------------------|-------------|
| `/`       | `npm run dev`          | Nodemon-powered backend server |
| `/`       | `npm start`            | Production-style backend start |
| `/frontend` | `npm start`          | React dev server on `http://localhost:3000` |
| `/frontend` | `npm run build`      | Production build of React app |

## 🛡️ Environment & Security Notes
- Always override `JWT_SECRET` in production
- Configure TLS/HTTPS when deploying
- Set CORS `CLIENT_URL` to your deployed frontend when hosting
- Add real storage for uploaded resources (currently lessons store text URLs)

## 🗺️ Roadmap Ideas
- Rich text editor & media uploads for lessons
- Assignment submissions and mentor feedback loops
- Calendar-based scheduling and reminders
- Real-time collaboration or chat for student teams
- Analytics dashboard for mentors/admins

## 📄 License
MIT © Umoja Robotics Team 7712

---
Have ideas for improvement? Open an issue or share feedback with the mentors—this LMS is built to grow alongside Umoja’s students.