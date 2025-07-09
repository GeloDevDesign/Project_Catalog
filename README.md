# Technical Exam – Full Stack Developer Application

**Sytian IT Productions Inc.**

This GitHub repository contains the source code for my technical exam as part of my application for the Full Stack Developer position at **Sytian IT Productions Inc.**

---

## Installation Instructions

### Frontend Setup

1. Open your terminal and navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. In the `vite.config.js` file (inside the `frontend` directory), update the proxy URL to point to your local backend URL.
   Example:

   ```js
   proxy: {
     '/api': 'http://127.0.0.1:8000',
   }
   ```

   or

   ```js
   proxy: {
     '/api': 'http://localhost:8000',
   }
   ```

---

### Backend Setup

1. Open your terminal and navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install the necessary dependencies:

   ```bash
   composer install
   ```

3. Set up your environment by copying `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

4. Generate the application key:

   ```bash
   php artisan key:generate
   ```

5. Update your `.env` file to configure your local database connection.

---

## Additional Notes

* Make sure you have **Node.js** and **npm** installed for the frontend.
* Make sure you have **PHP** and **Composer** installed for the backend.
* The backend uses **Laravel** and typically runs on `http://127.0.0.1:8000`.
* The frontend uses **Vite** and typically runs on `http://localhost:5173`.

---

Thank you for reviewing my submission.
