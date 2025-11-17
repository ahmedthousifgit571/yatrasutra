# Booking Form Guide

This application now uses a **Tour Booking Form** that generates professional booking confirmation receipts in PDF format.

## Form Fields Overview

The booking form is divided into three sections:

### 1. Client Details
- **Client Name** (Required) - Full name of the customer
- **Email Address** (Required) - Contact email
- **Contact Number** (Required) - Phone number with country code

### 2. Booking Details
- **Destination** (Required) - Travel destination (e.g., Lakshadweep, Goa, etc.)
- **Duration (Nights)** (Required) - Number of nights (1-365)
- **Check-in Date** (Required) - Arrival date
- **Check-out Date** (Required) - Departure date
- **Number of Adults** (Required) - Number of adult travelers (1-50)
- **Package Type** (Required) - Choose from:
  - Deluxe
  - Standard
  - Premium
  - Luxury
- **Meal Plan** (Required) - Choose from:
  - MAP (Breakfast & Dinner)
  - CP (Breakfast Only)
  - AP (All Meals)
  - EP (No Meals)

### 3. Cost & Payment Details
- **Tour Package Cost per Adult (INR)** (Required) - Base cost per person
- **Additional Services** (Optional) - Any extra services like airport transfers, sightseeing, etc.
- **Advance Amount (INR)** (Required) - Initial payment amount
- **Payment Mode** (Required) - Choose from:
  - UPI
  - Bank Transfer
  - Credit Card
  - Debit Card
  - Cash
- **Terms and Conditions** (Required) - Must be accepted

## Generated PDF Format

When a booking is approved, a professional PDF is generated with:

### Header Section
- Company logo area (YATRASUTRA branding)
- Watermark "YATRASUTRA" diagonally across the background
- Title: "BOOKING CONFIRMATION RECEIPT"
- Company details (address, contact info)

### Invoice Details
- Invoice Number (auto-generated)
- Invoice Date
- Payment Status (Advance Paid)
- Payment Date
- Mode of Payment

### Client Details
- Client Name
- Email
- Contact Number
- Booking Reference (auto-generated)

### Booking Summary (Table Format)
| Destination | Duration | Travel Dates | Guests | Package Type | Meal Plan |
|-------------|----------|--------------|--------|--------------|-----------|
| Details from form | ... | ... | ... | ... | ... |

### Cost Breakdown (Table Format)
| Particulars | Qty | Rate (INR) | Amount (INR) |
|-------------|-----|------------|--------------|
| Tour Package Cost per Adult | X | XXXXX | XXXXX |
| Additional Services (if any) | - | - | - |
| **Total Package Value** | - | - | **XXXXX** |
| **Advance Amount Received** | - | - | **XXXXX** |
| **Balance Payable** | - | - | **XXXXX** |

### Terms & Notes
- Standard booking terms
- Payment due dates
- Cancellation policy
- Other important notes

### Footer
- Authorized signatory section
- Company seal area
- Contact information (phone, email, website)

## Calculations

The PDF automatically calculates:

1. **Total Package Value** = Cost per Adult × Number of Adults
2. **Balance Payable** = Total Package Value - Advance Amount
3. **Duration Display** = X Nights / Y Days (where Y = X + 1)

## Date Formatting

All dates are displayed in the format: `DD MMM YYYY` (e.g., 15 May 2026)

## Currency Formatting

All amounts are displayed in Indian Rupees (INR) with proper thousand separators:
- Example: ₹2,16,000

## Sample Booking

Here's an example of a complete booking:

**Client Details:**
- Client Name: Mr. Rajesh Menon
- Email: rajesh.menon@gmail.com
- Contact: +91 98850 12345

**Booking Details:**
- Destination: Lakshadweep
- Duration: 3 Nights
- Check-in: 15 May 2026
- Check-out: 18 May 2026
- Guests: 8 Adults
- Package: Deluxe
- Meal Plan: MAP (Breakfast & Dinner)

**Cost Details:**
- Cost per Adult: ₹27,000
- Total Package Value: ₹2,16,000
- Advance Amount: ₹80,000
- Balance Payable: ₹1,36,000
- Payment Mode: UPI

## Customization

### Modify Form Fields

Edit `server/src/routes/form.js` to customize the form schema:

```javascript
const formSchema = {
  fields: [
    {
      name: 'fieldName',
      label: 'Display Label',
      type: 'text', // text, email, number, date, textarea, select, checkbox
      required: true,
      placeholder: 'Placeholder text',
      options: [] // For select fields
    }
  ]
};
```

### Modify PDF Layout

Edit `server/src/utils/pdfGenerator.js` to customize:
- Company branding
- Colors and styling
- Table layouts
- Terms and conditions text
- Footer information

### Change Company Details

In `server/src/utils/pdfGenerator.js`, update:

```javascript
// Company name
doc.text('YATRASUTRA', ...)

// Company details
doc.text('Yatrasutra Holidays Pvt. Ltd.', ...)
doc.text('Registered Address: ...', ...)

// Contact info in footer
doc.text('+919746816809', ...)
doc.text('info@yatrasutra.com', ...)
```

## Validation Rules

The form includes built-in validation:

1. **Required Fields**: Must be filled
2. **Email**: Must be valid email format
3. **Numbers**: Must be positive integers
4. **Dates**: Must be valid dates
5. **Duration**: 1-365 nights
6. **Number of Adults**: 1-50
7. **Terms**: Must be checked

## Admin Actions

When an admin approves a booking:
1. Status changes to "Approved"
2. PDF is automatically generated
3. PDF is uploaded to Appwrite Storage
4. PDF URL is saved to the database
5. User can download the PDF certificate

## User Experience

### Submitting a Booking
1. User fills out all three sections
2. Reviews entered information
3. Accepts terms and conditions
4. Clicks "Submit Booking"
5. Receives confirmation
6. Status shows as "Pending"

### After Approval
1. Status changes to "Approved"
2. Green badge appears
3. "Download PDF Certificate" button becomes available
4. Click button to view/download the booking confirmation

### If Rejected
1. Status changes to "Rejected"
2. Red badge appears
3. Admin's rejection message is displayed
4. User can submit a new booking

## Tips for Users

1. **Double-check dates** - Ensure check-in and check-out dates are correct
2. **Accurate guest count** - This affects pricing calculations
3. **Contact details** - Provide valid email and phone number
4. **Payment amount** - Verify advance amount matches your payment
5. **Additional services** - Mention any special requirements

## Tips for Admins

1. **Review carefully** - Check all details before approval
2. **Verify dates** - Ensure travel dates are feasible
3. **Cost validation** - Verify pricing is correct
4. **Additional services** - Check if extra services are noted
5. **PDF preview** - Generated PDF can be viewed before sending to customer

## Troubleshooting

### PDF Not Generating
- Check Appwrite storage bucket permissions
- Verify API key has storage.write permission
- Check server logs for errors

### Missing Fields in PDF
- Ensure all required fields are filled
- Check form validation passes
- Verify data is saved in database

### Calculation Errors
- Verify costPerAdult and numberOfAdults are numbers
- Check advanceAmount is less than total
- Review calculation logic in pdfGenerator.js

## Support

For issues or questions:
- Check server logs for error messages
- Verify Appwrite connection
- Review form schema in `server/src/routes/form.js`
- Check PDF generation in `server/src/utils/pdfGenerator.js`

---

**The booking form is now ready to use!** Users can submit bookings and receive professional PDF confirmations upon admin approval.


