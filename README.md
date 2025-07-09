# Technical Exam – Full Stack Developer Application

**Sytian IT Productions Inc.**

**Default Test Account:**
Email: `test@example.com`
Password: `Password1234`

You may check the **UserSeeder** for the default account details.
When running:

```bash
php artisan migrate:fresh --seed
```

The seeded account will be:

* **Email:** `test@example.com`
* **Password:** `Password1234`

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

Thank you for reviewing my submission.
