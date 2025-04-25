# Lama Dev School Management Dashboard

## Overview

This is a web application designed to serve as a comprehensive dashboard for school administration. It provides administrators with a centralized platform to monitor key aspects of school operations, visualize data, and manage information efficiently.

## Features (Admin Dashboard)

The current implementation focuses on the administrator's view, offering insights into:

*   **User Statistics:** Displays counts for different user roles within the school (Admins, Students, Teachers, Parents).
*   **Attendance Tracking:** Visualizes weekly student attendance data, showing trends in presence and absence.
*   **Financial Overview:** Includes a chart summarizing financial data (specific details depend on implementation).
*   **Event Scheduling:** Features a calendar to display upcoming school events.
*   **Announcements:** Provides a section for posting and viewing important announcements.

## Technology Stack (Core)

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **UI:** React, Tailwind CSS
*   **Data Visualization:** Recharts
*   **Database ORM:** Prisma

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
    *   Create a `.env` file in the root directory.
    *   Add necessary environment variables (e.g., `DATABASE_URL`). Refer to `.env.example` if available.
4.  **Set up the database:**
    *   Ensure your database server (e.g., PostgreSQL, MySQL) is running.
    *   Run Prisma migrations:
        ```bash
        npx prisma migrate dev
        ```
    *   (Optional) Seed the database:
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
