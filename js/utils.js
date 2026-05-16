// GENERATE UNIQUE ID

function generateId() {

    return Date.now() +
        Math.floor(Math.random() * 1000);
}

// VALIDATE EMAIL

function validateEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

// SHOW ALERT MESSAGE
 
function showAlert(
    message,
    type = "success"
) {

    // Remove existing alert
    const existingAlert =
        document.querySelector(".custom-alert");

    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert
    const alertBox =
        document.createElement("div");

    alertBox.className =
        `custom-alert ${type}`;

    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    // Show animation
    setTimeout(() => {

        alertBox.classList.add("show");

    }, 100);

    // Auto remove
    setTimeout(() => {

        alertBox.classList.remove("show");

        setTimeout(() => {

            alertBox.remove();

        }, 300);

    }, 3000);
}



function getTodayDate() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
 
// FORMAT DATE

function formatDate(dateString) {

    const options = {

        day: "numeric",

        month: "long",

        year: "numeric"
    };

    return new Date(dateString)
        .toLocaleDateString(
            "en-IN",
            options
        );
}

// ADD DAYS TO DATE

function addDays(date, days) {

    const result =
        new Date(date);

    result.setDate(
        result.getDate() + days
    );

    return result;
}

// AUTH CHECK

function checkAuth() {

    const currentUser =
        localStorage.getItem(
            "currentUser"
        );

    if (!currentUser) {

        window.location.href =
            "index.html";
    }
}

// LOGOUT FUNCTION

function logoutUser() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "index.html";
}

// EMPTY STATE TEMPLATE

function createEmptyState(message) {

    return `
        <div class="empty-state">

            <i class="fa-solid fa-folder-open"></i>

            <p>${message}</p>

        </div>
    `;
}

// GET MONTH NAME

function getMonthName(monthIndex) {

    const months = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",

        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return months[monthIndex];
}

// CALCULATE DAYS DIFFERENCE

function daysBetweenDates(
    startDate,
    endDate
) {

    const start =
        new Date(startDate);

    const end =
        new Date(endDate);

    const difference =
        end - start;

    return Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
    );
}

// GET RANDOM WELLNESS TIP

function getWellnessTip() {

    const tips = [

        "Stay hydrated throughout the day.",

        "Light exercise can improve mood and energy.",

        "Sleep well to support hormonal balance.",

        "Track symptoms regularly for better insights.",

        "Healthy food choices can reduce discomfort.",

        "Take breaks and relax when feeling stressed.",

        "Meditation may help during mood swings.",

        "Warm drinks can ease cramps and stress."
    ];

    const randomIndex =
        Math.floor(
            Math.random() * tips.length
        );

    return tips[randomIndex];
}
 
// LOCAL STORAGE DEBUG

function debugStorage() {

    console.log("Users:",
        Storage.getUsers());

    console.log("Current User:",
        Storage.getCurrentUser());

    console.log("Tracker Logs:",
        Storage.getTrackerLogs());

    console.log("Mood Logs:",
        Storage.getMoodLogs());

    console.log("Symptom Logs:",
        Storage.getSymptomLogs());

    console.log("Period Logs:",
        Storage.getPeriodLogs());
}