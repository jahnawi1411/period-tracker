# 🌸 Period Tracker Web Application

A modern frontend-based wellness and menstrual cycle tracking system developed using HTML, CSS, JavaScript, and LocalStorage.

---

# 📌 Project Overview

The Period Tracker Web Application helps users:

- Track menstrual cycles
- Predict upcoming periods
- Monitor moods and symptoms
- View wellness insights
- Manage personal wellness data

This project is completely frontend-based and does not require any backend or database server.

All user data is stored locally using the browser's LocalStorage.

---

# 🚀 Features

## 🔐 Authentication System

- User Registration
- User Login
- Session Management
- Logout Functionality
- Validation Checks

---

## 📊 Dashboard

- Welcome Section
- Cycle Overview
- Predicted Next Period
- Ovulation Prediction
- Current Mood Display
- Recent Activities

---

## 🩸 Period Tracking

- Log Period Dates
- Track Mood
- Track Symptoms
- Add Notes
- Wellness Monitoring

---

## 📅 Calendar System

- Period Prediction Calendar
- Ovulation Tracking
- Fertile Window Highlight
- Monthly Navigation

---

## 📈 Insights & Analytics

- Mood Trends
- Symptom Analysis
- Wellness Statistics
- Cycle Information

---

## ⚙️ Settings

- Profile Management
- Dark Mode Toggle
- Clear History
- Logout

---

# 🛠️ Technologies Used

| Technology   | Purpose       | 
|--------------|---------------|
| HTML5        | Structure     | 
| CSS3         | Styling       |
| JavaScript   | Functionality |
| LocalStorage | Data Storage  |
| Font Awesome | Icons         |
| Google Fonts | Typography    |
| Chart.js     | Analytics     |

---

# 📁 Project Structure

```bash
period-tracker/
│
├── index.html
├── register.html
├── dashboard.html
├── tracker.html
├── calendar.html
├── insights.html
├── settings.html
│
├── css/
│   ├── global.css
│   ├── dashboard.css
│   ├── tracker.css
│   ├── calendar.css
│   ├── insights.css
│   └── settings.css
│
├── js/
│   ├── storage.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── tracker.js
│   ├── calendar.js
│   ├── insights.js
│   ├── settings.js
│   └── utils.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── illustrations/
│
└── README.md
```

---

# 💾 LocalStorage Structure

```javascript
users: []
currentUser: {}
periodLogs: []
moodLogs: []
symptomLogs: []
```

---

# 🎨 UI/UX Features

- Modern Wellness Theme
- Responsive Design
- Soft Color Palette
- Glassmorphism Cards
- Smooth Animations
- Mobile-Friendly Layout

---

# 📱 Responsive Design

The application supports:

- Desktop
- Tablet
- Mobile Devices

---

# 🔮 Period Prediction Logic

```javascript
Next Period Date =
Last Period Date + Cycle Length
```

```javascript
Ovulation Date =
Next Period Date - 14 Days
```

---

# ⚠️ Limitations

- No backend database
- No encrypted authentication
- No cloud synchronization
- No multi-device support
- Data may be lost if LocalStorage is cleared

---

# 🔥 Future Enhancements

- Firebase Integration
- Real Authentication
- Push Notifications
- AI Health Assistant
- Cloud Backup
- Mobile App Version
- PDF Report Export

---

# ▶️ How to Run the Project

## Step 1

Download or clone the project.

---

## Step 2

Open the project folder in VS Code.

---

## Step 3

Run the project using Live Server.

OR

Open `index.html` directly in the browser.

---

# 👩‍💻 Developed For

Frontend Web Development Learning Project

---

# 📚 References

- MDN Web Docs
- W3Schools
- Chart.js Documentation
- Font Awesome
- Google Fonts

---

# 📄 License

This project is created for educational purposes only.

---

# 🌸 End of README
