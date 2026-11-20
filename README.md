# Campusly – Student Management System

**Smarter Campus. Simpler Management.**

Campusly is a full-stack Student Management System designed to manage student records and academic information through a centralized platform.

## Features

- Add, view, update and delete student records.
- Generate unique admission numbers automatically.
- Upload student profile photos.
- Search and filter student records.
- View individual student details.
- Validate student information on the frontend and backend.
- Store student records in PostgreSQL.
- Upload and manage student photos using Cloudinary.
- Responsive user interface.

## Technologies Used

### Frontend

- Angular
- TypeScript
- HTML5
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- Zod validation
- Multer

### Database and Services

- PostgreSQL
- Cloudinary
- Docker

### Development Tools

- Git and GitHub
- Postman
- VS Code

## Project Structure

```text
campusly-student-management/
├── frontend/
│   └── Angular application
├── backend/
│   └── Express API
├── README.md
└── .gitignore
```

## Prerequisites

Install the following before running the application:

- Node.js (LTS version)
- npm
- Angular CLI
- Docker Desktop
- Git
- Cloudinary account (required for photo uploads)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pradnya-patil19/campusly-student-management-system.git
cd campusly-student-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory using `.env.example` as a reference.

Configure your PostgreSQL and Cloudinary credentials.

Example local configuration:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=student_management
DB_USER=app_user
DB_PASSWORD=your_password
DB_SSL=false

CORS_ORIGIN=http://localhost:4200

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAX_UPLOAD_MB=5
```

Start PostgreSQL using the project's Docker Compose configuration, if provided:

```bash
docker compose up -d
```

Run database migrations if the project uses migrations:

```bash
npm run db:migrate
```

Start the backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:3000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Configure the frontend API URL in the environment configuration:

```typescript
apiUrl: "http://localhost:3000/api"
```

Start Angular:

```bash
npm start
```

Frontend URL:

```text
http://localhost:4200
```

## API Endpoints

Base URL:

```text
http://localhost:3000/api
```

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `/students`     | Get all students  |
| GET    | `/students/:id` | Get student by ID |
| POST   | `/students`     | Create a student  |
| PUT    | `/students/:id` | Update a student  |
| DELETE | `/students/:id` | Delete a student  |

### API Request Details

- Student creation and update use `multipart/form-data` when uploading a photo.
- The photo field name is `photo`.
- Student records are validated before database operations.
- Admission numbers are generated automatically.

## Environment Variables

The backend requires the following environment variables:

| Variable                | Description               |
| ----------------------- | ------------------------- |
| `PORT`                  | Backend server port       |
| `DB_HOST`               | PostgreSQL host           |
| `DB_PORT`               | PostgreSQL port           |
| `DB_NAME`               | Database name             |
| `DB_USER`               | Database username         |
| `DB_PASSWORD`           | Database password         |
| `DB_SSL`                | Enable database SSL       |
| `CORS_ORIGIN`           | Allowed frontend origin   |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name     |
| `CLOUDINARY_API_KEY`    | Cloudinary API key        |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret     |
| `MAX_UPLOAD_MB`         | Maximum photo upload size |

## Screenshots

The following directory contains screenshots of the application and its database setup.

```text
docs/
└── screenshots/
    ├── postgres.png
    ├── student-add-form.png
    ├── student-details.png
    ├── student-edit-form.png
    └── student-list.png
```

### Screenshot Descriptions

- **postgres.png** – PostgreSQL database setup and configuration.
- **student-add-form.png** – Student registration form for adding new student records.
- **student-details.png** – Detailed view of an individual student's information.
- **student-edit-form.png** – Form for updating existing student records.
- **student-list.png** – List of registered students with available management actions.

## Author

**Developed by Pradnya Patil | Full-Stack Software Developer Assessment Project**

## License

This project was developed for educational and assessment purposes.
