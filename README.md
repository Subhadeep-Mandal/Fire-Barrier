# ⭐ **FIRE BARRIER – PREMIUM BACKEND API**

### Node.js | Express | MongoDB | JWT | Razorpay Payments

This backend powers the **Fire Barrier** application (Android APK + Windows EXE).
It manages:

* User registration & login
* JWT authentication
* Premium subscription activation
* Razorpay payment integration
* Premium status validation
* MongoDB database connection

---

# 📁 **Project Structure**

```
fire-barrier-backend/
│
├── server.js
├── package.json
├── package-lock.json
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── utils/
│
├── .gitignore
└── README.md
```

**Note:**
`.env` and `node_modules/` are intentionally excluded via `.gitignore`.

---

# 🔧 **Tech Stack**

* **Node.js** – Backend runtime
* **Express.js** – API routing
* **MongoDB Atlas** – Cloud database
* **Mongoose** – ODM
* **JWT Authentication** – Secure login
* **Razorpay API** – Payment & subscription activation
* **BCrypt** – Password hashing
* **CORS** – Cross-platform support (Android + Windows)

---

# 🔐 **Environment Variables**

Create a `.env` file with:

```
PORT=5000
MONGO_URL=your_mongodb_atlas_connection
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=rzp_test_xxxxxxx
RAZORPAY_SECRET=xxxxxxxxxxxxx
```

Never upload `.env` to GitHub.

---

# 🚀 **How to Run Locally**

```
npm install
node server.js
```

You should see:

```
Server running on port 5000
MongoDB Connected
```

---

# 📌 **API ROUTES**

---

# 🧑‍💻 **AUTH**

### **Register User**

```
POST /api/register
```

Body:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

### **Login User**

```
POST /api/login
```

Body:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

Response contains `token` used for protected routes.

---

# ⭐ **PREMIUM STATUS**

### **Get Premium Status**

```
GET /api/user/status
```

Headers:

```
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "isPremium": true,
  "premiumExpiry": "2026-01-01"
}
```

---

# 💳 **RAZORPAY PAYMENTS**

### **Create Payment Order**

```
POST /api/payment/order
```

Body:

```json
{
  "amount": 199
}
```

Response:

```json
{
  "success": true,
  "orderId": "order_xxx",
  "key": "rzp_test_xxx"
}
```

### **Verify Payment**

```
POST /api/payment/verify
```

Body:

```json
{
  "orderId": "razorpay_order_id",
  "paymentId": "razorpay_payment_id",
  "signature": "razorpay_signature",
  "userId": "MONGO_USER_ID"
}
```

If valid, backend activates premium for 1 year.

---

# 🧩 **Premium Activation Logic**

On successful payment verification:

```
isPremium = true
premiumExpiry = today + 365 days
```

Stored in MongoDB user document.

---

# 🌐 **Deployment Guide**

### Backend deployment platforms:

* **Railway.app** (Recommended – free, fast, easiest)
* Render.com
* AWS / Vercel / Hostinger VPS (Optional)

### Steps:

1. Push repo to GitHub
2. Connect Railway → New Project → Deploy from GitHub
3. Add `.env` variables
4. Backend URL becomes:

```
https://firebarrier-backend-production.up.railway.app
```

5. Use this URL in:

   * Android APK
   * Windows EXE
   * premium.html payment page

---

# 💸 **Payment Pages (Frontend)**

Payment UI is hosted separately (Netlify/GitHub Pages):

```
premium.html
thankyou.html
cancelled.html
```

The app opens:

```
https://your-hosting-url/premium.html?user=USER_ID
```

---

# 🎯 **Features**

* Secure authentication
* Razorpay test/live mode support
* Verified payments only activate premium
* Fully cross-platform
* Works with Android, Windows, WebView
* Clean API response JSON
* Scalable architecture

---

# 👥 **Team Usage**

This backend is used by:

* Android Developer (APK)
* Windows Developer (EXE)
* Payment Page Developer
* Testing/QA Team

---