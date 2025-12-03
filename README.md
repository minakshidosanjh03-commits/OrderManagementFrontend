# Real-Time Order Tracking Frontend  
A React.js application with Redux Toolkit Query, Pusher real-time updates, protected routing, and JWT-based authentication.

---

## 🚀 Features
- User authentication (Login & Signup)
- Protected routes for Products & Orders
- Real-time order status updates via WebSockets (Pusher/Echo)
- Product listing + Order listing
- Live order updates without refreshing
- Logout system with token removal

---

# 🛠️ Setup Instructions

## 1️⃣ Clone the project
```bash
git clone <your-repo-url>
cd <project-folder>

## 2️⃣ Install dependencies
npm install

## 3️⃣ Configure environment variables

Create a .env file in the root:

REACT_APP_API_URL=http://your-backend-url/api
REACT_APP_PUSHER_KEY=your-key
REACT_APP_PUSHER_CLUSTER=your-cluster

## 4️⃣ Run the project
npm start