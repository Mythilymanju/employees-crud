# Employee Management – React.js + Laravel CRUD

A simple CRUD application built with **React.js (Vite)** and a **Laravel 9 REST API** with MySQL.

## Features
- Create, view, update and delete employees
- Server-side validation (Laravel) with error messages shown in the UI
- Unique email validation
- Search/filter employees
- Clean, responsive UI

## Tech Stack
- Frontend: React, Vite, Axios
- Backend: Laravel 9, PHP 8.0+
- Database: MySQL / MariaDB (XAMPP)

## Prerequisites
- PHP >= 8.0 and Composer
- Node.js >= 18 and npm
- MySQL (XAMPP or standalone)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/employees-crud.git
cd employees-crud
```

### 2. Database
Start MySQL and create an empty database named `employee_crud`
(for example in phpMyAdmin at http://localhost/phpmyadmin).

### 3. Backend (Laravel)
```bash
cd backend
composer install
copy .env.example .env      # on macOS/Linux: cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
The API runs at `http://127.0.0.1:8000/api`.

If your MySQL credentials differ from the defaults, update `DB_USERNAME` and
`DB_PASSWORD` in `backend/.env`.

### 4. Frontend (React)
Open a second terminal:
```bash
cd frontend
npm install
copy .env.example .env      # on macOS/Linux: cp .env.example .env
npm run dev
```
The app runs at `http://localhost:5173`.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/employees | List all employees |
| POST | /api/employees | Create an employee |
| GET | /api/employees/{id} | Get one employee |
| PUT | /api/employees/{id} | Update an employee |
| DELETE | /api/employees/{id} | Delete an employee |

## Sample Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "department": "Engineering"
}
```

## Project Structure
```
employees-crud/
├── backend/    # Laravel API
└── frontend/   # React app
```

