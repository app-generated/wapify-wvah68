# Wapify Generated API

## Installation

```bash
cd api
npm install
```

## Configuration

Create a `.env` file with:
```
DATABASE_URL=your_neon_connection_string
PORT=3001
```

## Running

```bash
npm start
```

## API Endpoints

### tasks
- GET /api/tasks - Get all
- GET /api/tasks/:id - Get by ID
- POST /api/tasks - Create
- PUT /api/tasks/:id - Update
- DELETE /api/tasks/:id - Delete

### categories
- GET /api/categories - Get all
- GET /api/categories/:id - Get by ID
- POST /api/categories - Create
- PUT /api/categories/:id - Update
- DELETE /api/categories/:id - Delete

