# LuminUI API Documentation

## Base URL
- Development: `http://localhost:4000/api`
- Production: `{YOUR_DOMAIN}/api`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Health Check
- **GET** `/health` - Check if API is running
- **Response**: `{"status": "ok"}`

### Authentication

#### Register
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
  ```

#### Login
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Same as register

### Profile (Protected)

#### Get Profile
- **GET** `/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "user": {
      "email": "john@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### Update Profile
- **PUT** `/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "John Smith"
  }
  ```
- **Response**: Same as get profile

### Tasks (Protected)

#### Get Tasks
- **GET** `/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `q` (optional): Search query
  - `status` (optional): Filter by status (`todo`, `in_progress`, `done`)
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10, max: 100)
- **Response**:
  ```json
  {
    "items": [
      {
        "_id": "task_id",
        "title": "Task title",
        "description": "Task description",
        "status": "todo",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  }
  ```

#### Create Task
- **POST** `/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "New task",
    "description": "Task description",
    "status": "todo"
  }
  ```
- **Response**:
  ```json
  {
    "task": {
      "_id": "task_id",
      "title": "New task",
      "description": "Task description",
      "status": "todo",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### Update Task
- **PUT** `/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "status": "in_progress"
  }
  ```
- **Response**: Same as create task

#### Delete Task
- **DELETE** `/tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "ok": true
  }
  ```

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message",
  "details": "Additional details (optional)"
}
```

### Common Status Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `409` - Conflict (email already exists)
- `500` - Internal Server Error

## Validation Rules

### User Registration/Login
- `email`: Must be valid email format
- `password`: Minimum 8 characters
- `name`: 1-100 characters

### Task
- `title`: Required, minimum 1 character
- `description`: Optional
- `status`: Must be one of: `todo`, `in_progress`, `done`
