# Testing Guide

This document provides instructions for testing the PDF Generator application.

## Quick Start Testing

### 1. Start the Application

Make sure both server and client are running:

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client  
cd client
npm run dev
```

### 2. Access the Application

Open your browser and navigate to: `http://localhost:3000`

---

## Test Scenarios

### Scenario 1: User Registration and Login

**Objective**: Verify user registration and authentication

**Steps**:
1. Go to `http://localhost:3000/login`
2. Click "Create new account"
3. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Sign up"

**Expected Result**:
- ✓ User is created successfully
- ✓ Automatically logged in
- ✓ Redirected to `/user` dashboard
- ✓ Welcome message shows user's name

**Database Check**:
- Open Appwrite Console → Databases → users collection
- Verify new user document exists

---

### Scenario 2: Admin Login

**Objective**: Verify admin authentication and redirect

**Steps**:
1. If logged in, sign out
2. Go to login page
3. Enter:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Click "Sign in"

**Expected Result**:
- ✓ Login successful
- ✓ Redirected to `/admin` dashboard
- ✓ Admin dashboard displays statistics

---

### Scenario 3: Submit Form (User)

**Objective**: Test form submission flow

**Steps**:
1. Login as a regular user
2. Navigate to "New Submission" tab
3. Fill out the form:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+1 555-123-4567`
   - Date of Birth: `1990-01-01`
   - Address: `123 Main St, City, State 12345`
   - Occupation: `Software Developer`
   - Country: `United States`
   - Years of Experience: `5`
   - Terms: ✓ Checked
   - Comments: `Test submission`
4. Click "Submit Application"

**Expected Result**:
- ✓ Success notification appears
- ✓ Redirected to "My Submissions" tab
- ✓ New submission appears with "Pending" status
- ✓ "Waiting for admin approval" message shown

**Database Check**:
- Check submissions collection in Appwrite
- Verify new document with status: `pending`

---

### Scenario 4: View Submissions (Admin)

**Objective**: Verify admin can view all submissions

**Steps**:
1. Sign out and login as admin
2. Admin dashboard loads
3. Observe statistics panel
4. Review submissions list

**Expected Result**:
- ✓ Statistics show correct counts
- ✓ Pending submissions are visible
- ✓ Submission shows user's name and email
- ✓ "View Details" button is available

---

### Scenario 5: Approve Submission (Admin)

**Objective**: Test approval and PDF generation

**Steps**:
1. As admin, click "View Details" on a pending submission
2. Modal opens showing full submission data
3. Click "Approve & Generate PDF"
4. Wait for processing

**Expected Result**:
- ✓ "Processing..." state shows
- ✓ Success notification appears
- ✓ Modal closes
- ✓ Submission status changes to "Approved"
- ✓ Submission disappears from pending filter

**PDF Check**:
- Switch to "Approved" filter
- Click "View Details" on approved submission
- "View Generated PDF" link should be visible
- Click link - PDF should open in new tab
- PDF contains all form data
- PDF shows "APPROVED" stamp

**Database Check**:
- Check submission document
- Status should be: `approved`
- `pdfUrl` field should contain URL

**Storage Check**:
- Appwrite Console → Storage → pdfs bucket
- New PDF file should exist

---

### Scenario 6: Reject Submission (Admin)

**Objective**: Test rejection flow

**Steps**:
1. Create a new submission as user
2. Login as admin
3. Click "View Details" on pending submission
4. Click "Reject"
5. Enter rejection message: `Missing required documentation`
6. Click "Confirm Rejection"

**Expected Result**:
- ✓ Success notification appears
- ✓ Modal closes
- ✓ Submission status changes to "Rejected"
- ✓ Submission moves to rejected filter

**User Side**:
1. Logout and login as user
2. Go to "My Submissions"
3. View rejected submission

**Expected Result**:
- ✓ Status badge shows "Rejected"
- ✓ Red rejection box appears
- ✓ Admin's message is displayed

---

### Scenario 7: View My Submissions (User)

**Objective**: Verify user can track their submissions

**Steps**:
1. Login as user with multiple submissions
2. Click "My Submissions" tab
3. View list of submissions

**Expected Result**:
- ✓ All user's submissions are listed
- ✓ Status badges are correct
- ✓ Click "View Details" shows full data
- ✓ For approved: PDF download link works
- ✓ For rejected: Rejection message shows

---

### Scenario 8: Form Validation

**Objective**: Test form field validation

**Steps**:
1. Login as user
2. Go to "New Submission"
3. Try to submit empty form
4. Fill only some required fields
5. Try invalid email format
6. Try submitting without checking terms

**Expected Result**:
- ✓ Cannot submit empty form
- ✓ Error messages appear for empty required fields
- ✓ Email validation works
- ✓ Terms checkbox must be checked
- ✓ Form only submits when all required fields are valid

---

### Scenario 9: Filter Submissions (Admin)

**Objective**: Test admin filtering functionality

**Steps**:
1. Login as admin
2. Click "All" filter
3. Click "Pending" filter
4. Click "Approved" filter
5. Click "Rejected" filter

**Expected Result**:
- ✓ "All" shows all submissions
- ✓ Each filter shows only matching submissions
- ✓ Statistics remain accurate
- ✓ Empty state shows when no submissions match

---

### Scenario 10: Logout and Session Management

**Objective**: Test authentication persistence

**Steps**:
1. Login as user
2. Refresh the page
3. Navigate directly to `/admin`
4. Logout
5. Try accessing `/user` directly

**Expected Result**:
- ✓ User stays logged in after refresh
- ✓ Regular user cannot access `/admin`
- ✓ Redirected to appropriate dashboard
- ✓ After logout, redirected to login
- ✓ Cannot access protected routes when logged out

---

## Testing Different Form Field Types

### Text Fields
- Enter normal text
- Try special characters
- Try very long text
- Leave empty (if optional)

### Email Field
- Valid email: `user@example.com`
- Invalid email: `notanemail`
- Empty (should fail if required)

### Number Field
- Valid number: `5`
- Decimal: `5.5` (should work)
- Negative: `-5` (depends on validation)
- Text: `abc` (should fail)

### Date Field
- Valid date: Use date picker
- Future date
- Past date

### Select Field
- Select each option
- Leave unselected

### Textarea
- Short text
- Long paragraph
- Special characters
- Empty (if optional)

### Checkbox
- Check and uncheck
- Try submitting unchecked

---

## API Testing (Using Postman/curl)

### 1. Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "email": "apitest@example.com",
    "password": "password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "password123"
  }'
```

Save the returned token.

### 3. Get Form Schema

```bash
curl -X GET http://localhost:5000/api/form/schema \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Submit Form

```bash
curl -X POST http://localhost:5000/api/form/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "fullName": "API Test",
      "email": "test@example.com",
      "phone": "1234567890",
      "dateOfBirth": "1990-01-01",
      "address": "123 Test St",
      "occupation": "Tester",
      "country": "us",
      "experience": "5",
      "terms": true,
      "comments": "API test"
    }
  }'
```

### 5. Get My Submissions

```bash
curl -X GET http://localhost:5000/api/form/my-submissions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. Admin: Get All Submissions

```bash
curl -X GET http://localhost:5000/api/admin/submissions \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 7. Admin: Approve Submission

```bash
curl -X POST http://localhost:5000/api/admin/form/SUBMISSION_ID/approve \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 8. Admin: Reject Submission

```bash
curl -X POST http://localhost:5000/api/admin/form/SUBMISSION_ID/reject \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Reason for rejection"
  }'
```

---

## Performance Testing

### Load Testing (Optional)

Use tools like Apache Bench or Artillery:

```bash
# Install Artillery
npm install -g artillery

# Create test script (test-load.yml)
artillery quick --count 10 --num 50 http://localhost:5000/health
```

### Metrics to Monitor

- Response time < 500ms
- Error rate < 1%
- Memory usage stable
- No memory leaks
- Database queries optimized

---

## Common Issues and Solutions

### Issue: CORS Error
**Solution**: Check that client URL is allowed in server CORS config

### Issue: 401 Unauthorized
**Solution**: Check token is valid and not expired

### Issue: PDF not generating
**Solution**: 
- Check server logs
- Verify Appwrite storage bucket permissions
- Ensure API key has storage.write permission

### Issue: Database errors
**Solution**:
- Verify Appwrite connection
- Check collection IDs match
- Ensure attributes are created

---

## Test Data Cleanup

### Clear Test Data

**Manual Cleanup**:
1. Go to Appwrite Console
2. Delete test submissions from submissions collection
3. Delete test users from users collection
4. Delete test PDFs from storage bucket

**Keep**:
- Admin credentials
- Schema configuration
- Collection structure

---

## Automated Testing (Future Enhancement)

Consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Cypress/Playwright for E2E tests
- Supertest for API tests

---

## Test Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Admin login works
- [ ] Form schema loads
- [ ] Form validation works
- [ ] Form submission works
- [ ] Submissions appear in user dashboard
- [ ] Submissions appear in admin dashboard
- [ ] Admin can approve submissions
- [ ] PDF generates correctly
- [ ] PDF downloads successfully
- [ ] Admin can reject submissions
- [ ] Rejection message appears for user
- [ ] Filters work in admin dashboard
- [ ] Statistics are accurate
- [ ] Logout works
- [ ] Protected routes are secure
- [ ] Session persists on refresh

---

**Happy Testing! 🧪**



