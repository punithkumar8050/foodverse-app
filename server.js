const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // To parse JSON bodies (for Order details)

// --- 1. AUTHENTICATION ENDPOINTS ---

// Send OTP
app.post('/api/auth/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    // TODO: Integrate Twilio API here to send SMS
    console.log(`Sending OTP to ${phoneNumber}`);
    res.json({ success: true, message: "OTP Sent" });
});

// Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
    // TODO: Verify against database
    if(otp === "1234") { // Mock check
        res.json({ success: true, token: "user_session_token" });
    } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
    }
});

// --- 2. DATA ENDPOINTS ---

// Get Restaurants based on location (lat/long)
app.get('/api/restaurants', (req, res) => {
    const { lat, long } = req.query;
    // TODO: Query MongoDB for restaurants near these coordinates
    res.json([
        { id: 1, name: "Pizza Palace", cuisine: "Italian" },
        { id: 2, name: "Curry House", cuisine: "Indian" }
    ]);
});

// --- 3. ORDER & TRACKING ENDPOINTS ---

// Place Order
app.post('/api/order/place', (req, res) => {
    const { userId, items, totalAmount } = req.body;
    const orderId = "ORD-" + Date.now();
    // TODO: Save to 'Orders' table in DB
    // TODO: Trigger Payment Gateway
    res.json({ success: true, orderId: orderId, status: "PLACED" });
});

// Get Driver Location (For Tracking)
app.get('/api/track/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    // TODO: Fetch real-time driver coords from 'Drivers' table
    res.json({ 
        orderId: orderId,
        driverName: "Ramesh",
        coords: { lat: 12.9716, lng: 77.5946 }, // Coordinates update in real-time
        eta: "15 mins" 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // ... existing code ...

// --- ROOT ROUTE (Add this!) ---
const path = require('path'); // Add this line at the VERY TOP of your file if it's not there

// This tells the server: "When a user goes to '/', send them the index.html file"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ... app.listen code ...
});
