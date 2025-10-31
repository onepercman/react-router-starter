# Test Login Integration

## Setup Completed ✅

1. **API Route**: `/api/login` at `app/routes/api.login.ts`
2. **Auth Service**: Updated to call real API at `app/modules/auth/auth-service.ts`
3. **UI Updated**: Demo credentials changed to `admin@example.com` / `admin123`

## Test Credentials

- **Username**: `admin@example.com`
- **Password**: `admin123`

## How to Test

1. Start dev server:
   ```bash
   pnpm dev
   ```

2. Navigate to: `http://localhost:3000/auth/login`

3. Enter credentials:
   - Email: `admin@example.com`
   - Password: `admin123`

4. Click "Sign in"

5. Should redirect to `/dashboard` on success

## API Details

**Endpoint**: `POST /api/login`

**Request Body**:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "1",
    "username": "admin",
    "name": "Admin User"
  },
  "token": "mock-jwt-token-xxxxx"
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

## Flow

1. User submits login form
2. `useAuth` hook calls `auth-service.login()`
3. Service extracts username from email (`admin@example.com` → `admin`)
4. Service calls `POST /api/login` with username/password
5. API validates against hardcoded credentials
6. On success: Returns user + token, stored in localStorage + Zustand
7. On error: Shows error message on form
8. Success redirects to `/dashboard`
