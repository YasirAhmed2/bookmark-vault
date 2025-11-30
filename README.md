

# 📘 MERN Bookmark Manager

A full-stack **MERN (MongoDB, Express, React, Node.js)** application that allows users to securely register, log in, and manage their personal bookmarks with features like add, delete, copy, open, and dark mode toggle.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration & Login
* Password hashing using **bcrypt**
* JWT-based authentication with protected routes
* Secure `.env` configuration (not pushed to GitHub)

### 📚 Bookmark Management

* Add Bookmark (title + URL/description)
* View all saved bookmarks on Dashboard
* Open bookmark in new tab
* Copy bookmark URL with one click
* Delete bookmarks
* Clean and responsive UI

### 🌙 UI / UX Features

* **Dark & Light Mode** toggle
* Mobile-responsive dashboard
* Interactive buttons & animations

### 🗄️ Backend (Node.js + Express)

* RESTful API architecture
* Authentication middleware
* Protected API endpoints
* MongoDB connection (via Docker container)

### 🐳 Docker Integration

* MongoDB runs using a Docker container
* Environment variables stored in `.env`
* No credentials are committed to Git repo

### 🧩 Project Structure

```
📦 bookmark-vault/
│
├── 📁 client/
│   └── 📁 bookmark-organizer/      # React Frontend (Main UI)
│       ├── 📁 public/              # Static assets
│       └── 📁 src/
│           ├── 📁 components/      # Reusable components (Buttons, Navbar, Cards, etc.)
│           ├── 📁 pages/           # Pages (Register, Login, Dashboard)
│           ├── 📁 types/           # index.t.ts
│           ├── App.tsx             # Main App component
│           ├── main.tsx            # React entry point
|           ├── App.css             # CSS style for main App Component
|           ├── index.html
│           └── ...                 # Other utilities
│
├── 📁 server/                       # Backend (Node.js + Express)
└── 📁 src/
│     ├── 📁 utils/                    # validation.js
│     ├── 📁 controllers/              # Business logic (Auth, Bookmark)
│     ├── 📁 middleware/               # JWT Authentication middleware
│     ├── 📁 models/                   # Mongoose models (User, Bookmark) and database controller functions
│     ├── 📁 routes/                   # API Endpoints
│   └── index.js                       # Backend entry file
├── .gitignore
├── README.md
└── package-lock.json
└── package.json                     # Root package (Optional)


```

---

## ⚙️ Tech Stack

### **Frontend**

* React.js
* React Router
* Axios

### **Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt
* JWT

### **DevOps / Utilities**

* Docker
* Bruno (For API testing)

---

## 🛠️ Installation & Setup

### **1. Clone the repository**

```bash
git clone https://github.com/YasirAhmed2/bookmark-vault
```

---

## 🗄️ Backend Setup (server)

### **2. Install backend dependencies**

```bash
cd server
npm install
```

### **3. Create a `.env` file inside `/server`**

```
DB_URL=mongodb://<username>:<password>@localhost:27017/<database>?authSource=admin
JWT_SECRET=your_secret_key
PORT=5000
```
---

## 🐳 MongoDB using Docker

### **4. Start MongoDB container**

```bash
docker run -d -p 27017:27017 --name bookmark-mongo mongo
```

OR if using **docker-compose.yml**:

```bash
docker-compose up -d
```

---

## ▶️ Start Backend Server

```bash
npm run dev
```

---

## 🌐 Frontend Setup (client)

### **5. Install frontend dependencies**

```bash
cd ../client/bookmark-organizer
npm install
```

### **6. Start React app**

```bash
npm run dev
```
---

## 🔑 User Flow

1. **Register** → create account
2. **Login** → get JWT token
3. **Dashboard** → view bookmarks
4. **Add Bookmark** → title + URL
5. **Actions** available:
   * 🔗 Open
   * 📋 Copy
   * ❌ Delete
6. Toggle **Dark/Light mode**
7. Logout →

---

## 📡 API Endpoints

### **Auth Routes**

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/auth/register`     | Register new user         |
| POST   | `/auth/login`        | Login & get JWT           |
| POST   | `/auth/logout`       | Logout & clear JWT token  |

### **Bookmark Routes** (Protected)

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/bookmarks`     | Get all bookmarks |
| POST   | `/bookmarks`     | Add new bookmark  |
| DELETE | `/bookmarks/delete/:id` | Delete bookmark   |

---

## 🔐 Authentication Middleware

* Verifies JWT token
* Protects backend routes
* Ensures only logged-in users can access their bookmarks

---

---

## 🤖 Future Enhancements (Recommended)

* Folder/category system for bookmarks
* Search functionality
* Edit bookmark
* Tags + filtering
* User analytics dashboard

---

## 👨‍💻 Author

**Yasir Ahmed**
AI/ML Enthusiast | Data Science
Passionate MERN + AI full-stack development 🚀

---

## ⭐ Contribute

Contributions, issues, and feature requests are welcome!
Feel free to open a PR.

---

## 📜 License

This project is licensed under the **MIT License**.

---

