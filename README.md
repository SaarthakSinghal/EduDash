# EduDash 

## Overview

This is a full-stack web application designed to serve as a comprehensive dashboard for school management. It provides different user roles (Admin, Teacher, Student, Parent) with tailored interfaces to manage information, track progress, and facilitate communication efficiently.

## Key Features

This application offers a range of functionalities accessible through role-based dashboards:

- **Secure Authentication:** Utilizes Clerk for robust user sign-up, sign-in, and session management, ensuring secure access for all roles.
- **Role-Based Dashboards:** Provides distinct dashboard views for Administrators, Teachers, Students, and Parents, each tailored with relevant information and actions.
- **User Management (Admin):** Admins can view and potentially manage lists of Students, Teachers, and Parents.
- **Academic Structure Management (Admin):** Admins can manage core academic data including Subjects, Classes, and Lessons.
- **Scheduling & Events:** Features functionality to manage and display school Events (potentially via a Calendar view) and Announcements.
- **Academic Records Management:** Includes modules for managing Assignments, Exams, and Results.
- **Data Visualization:** Leverages libraries like Recharts to display key statistics and trends (e.g., attendance, financials) on relevant dashboards.
- **CRUD Operations:** Implements Create, Read, Update, and Delete functionality for various data types (e.g., Subjects, Events) using Next.js Server Actions and Prisma.
- **Optimized Performance:** Employs techniques like data revalidation (`revalidatePath`) and potentially lazy loading of components for a smooth user experience.

## Technology Stack

- **Framework:** Next.js 14.2.26 (App Router)
- **Language:** TypeScript
- **Authentication:** Clerk
- **UI:** React, Tailwind CSS
- **Data Visualization:** Recharts
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Form Validation:** Zod

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```
3.  **Set up environment variables:**
    - Create a `.env` file in the root directory.
    - Add necessary environment variables (e.g., `DATABASE_URL`). Refer to `.env.example` if available.
4.  **Set up the database:**
    - Ensure your database server (e.g., PostgreSQL, MySQL) is running.
    - Run Prisma migrations:
      ```bash
      npx prisma migrate dev
      ```
    - (Optional) Seed the database:
      ```bash
      npx prisma db seed
      ```

## Running the Development Server

Execute one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
