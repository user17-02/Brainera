# Brainera Backend

This is the backend for the Brainera online learning platform.

## Prerequisites

- Node.js
- MongoDB

## Getting Started

1.  **Clone the repository** (or download the files).

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4.  **Run the server:**
    ```bash
    npm run dev
    ```
    The server will start on port 5000.

## API Endpoints

### Authentication

-   **`POST /api/auth/register`**: Register a new user.
    -   **Body**: `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "role": "student" }`
    -   **Role can be `student`, `instructor`, or `admin`.**
-   **`POST /api/auth/login`**: Login a user.
    -   **Body**: `{ "email": "john@example.com", "password": "password123" }`
    -   **Returns a JWT token.**

### Courses

-   **`GET /api/courses`**: Get all published courses.
-   **`GET /api/courses/:id`**: Get a single course by ID.
-   **`POST /api/courses`**: Create a new course (requires instructor/admin token).
    -   **Body**: `{ "title": "Course Title", "description": "Course description", "category": "Development", "price": 49.99, "duration": "8 hours", "level": "Beginner", "thumbnail": "image_url" }`
-   **`PUT /api/courses/:id`**: Update a course (requires instructor/admin token).
-   **`DELETE /api/courses/:id`**: Delete a course (requires instructor/admin token).

### Lessons

-   **`GET /api/courses/:courseId/lessons`**: Get all lessons for a course.
-   **`POST /api/courses/:courseId/lessons`**: Add a new lesson to a course (requires instructor/admin token).
    -   **Body**: `{ "title": "Lesson 1", "content": "Lesson content", "videoUrl": "video_url" }`
-   **`PUT /api/courses/:courseId/lessons/:lessonId`**: Update a lesson (requires instructor/admin token).
-   **`DELETE /api/courses/:courseId/lessons/:lessonId`**: Delete a lesson (requires instructor/admin token).

### Enrollments

-   **`POST /api/enrollments/:courseId`**: Enroll in a course (requires student token).
-   **`GET /api/enrollments/my-courses`**: Get all courses enrolled by the current user (requires student token).
-   **`GET /api/enrollments/:courseId/students`**: Get all students enrolled in a course (requires instructor/admin token).

### Reviews

-   **`GET /api/courses/:courseId/reviews`**: Get all reviews for a course.
-   **`POST /api/courses/:courseId/reviews`**: Add a review to a course (requires student token and enrollment).
    -   **Body**: `{ "rating": 5, "comment": "Great course!" }`
-   **`PUT /api/courses/:courseId/reviews/:reviewId`**: Update a review (requires student token).
-   **`DELETE /api/courses/:courseId/reviews/:reviewId`**: Delete a review (requires student token).

### Admin

-   **`GET /api/admin/stats`**: Get dashboard statistics (requires admin token).
