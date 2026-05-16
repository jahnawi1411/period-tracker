/* 
   CALENDAR SYSTEM
   Period Tracker Web Application
 */

// 
// AUTH CHECK
// 

checkAuth();

const currentUser = Storage.getCurrentUser();

// 
// DOM ELEMENTS
// 

const calendarGrid =
    document.getElementById("calendarGrid");

const monthYear =
    document.getElementById("monthYear");

const prevMonthBtn =
    document.getElementById("prevMonthBtn");

const nextMonthBtn =
    document.getElementById("nextMonthBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

// 
// DATE VARIABLES
// 

let currentDate = new Date();

let currentMonth =
    currentDate.getMonth();

let currentYear =
    currentDate.getFullYear();

// 
// INITIALIZATION
// 

document.addEventListener("DOMContentLoaded", () => {

    renderCalendar();

    initializeMonthButtons();

    initializeLogout();

});

// 
// RENDER CALENDAR
// 

function renderCalendar() {

    calendarGrid.innerHTML = "";

    const firstDay =
        new Date(currentYear, currentMonth, 1);

    const lastDay =
        new Date(currentYear, currentMonth + 1, 0);

    const totalDays =
        lastDay.getDate();

    const startDay =
        firstDay.getDay();

    // 
    // MONTH TITLE
    // 

    monthYear.textContent =
        firstDay.toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric"
        });

    // 
    // EMPTY BOXES
    // 

    for (let i = 0; i < startDay; i++) {

        const emptyBox =
            document.createElement("div");

        emptyBox.classList.add(
            "day-box",
            "empty-day"
        );

        calendarGrid.appendChild(emptyBox);
    }

    // 
    // USER PERIOD DATA
    // 

    const periodLogs =
        Storage.getPeriodLogs();

    const userPeriodLogs =
        periodLogs.filter(
            log => log.userId === currentUser.id
        );

    let predictedPeriodDate = null;
    let ovulationDate = null;

    if (userPeriodLogs.length > 0) {

        const latestLog =
            userPeriodLogs[userPeriodLogs.length - 1];

        predictedPeriodDate =
            addDays(
                latestLog.date,
                currentUser.cycleLength
            );

        ovulationDate =
            addDays(
                predictedPeriodDate,
                -14
            );
    }

    // 
    // CREATE DAY BOXES
    // 

    for (let day = 1; day <= totalDays; day++) {

        const dayBox =
            document.createElement("div");

        dayBox.classList.add("day-box");

        const fullDate =
            new Date(
                currentYear,
                currentMonth,
                day
            );

        // Day Number
        dayBox.innerHTML = `
            <div class="day-number">
                ${day}
            </div>
        `;

        // 
        // TODAY HIGHLIGHT
        // 

        const today = new Date();

        if (
            fullDate.toDateString() ===
            today.toDateString()
        ) {
            dayBox.classList.add("today");
        }

        // 
        // PERIOD PREDICTION
        // 

        if (predictedPeriodDate) {

            const prediction =
                new Date(predictedPeriodDate);

            if (
                fullDate.toDateString() ===
                prediction.toDateString()
            ) {

                dayBox.classList.add(
                    "period-day"
                );
            }
        }

        // 
        // OVULATION DAY
        // 

        if (ovulationDate) {

            const ovulation =
                new Date(ovulationDate);

            if (
                fullDate.toDateString() ===
                ovulation.toDateString()
            ) {

                dayBox.classList.add(
                    "ovulation-day"
                );
            }
        }

        // 
        // FERTILE WINDOW
        // 

        if (ovulationDate) {

            const fertileStart =
                addDays(ovulationDate, -2);

            const fertileEnd =
                addDays(ovulationDate, 2);

            if (
                fullDate >= fertileStart &&
                fullDate <= fertileEnd
            ) {

                dayBox.classList.add(
                    "fertile-day"
                );
            }
        }

        calendarGrid.appendChild(dayBox);
    }
}

// 
// MONTH NAVIGATION
// 

function initializeMonthButtons() {

    prevMonthBtn.addEventListener("click", () => {

        currentMonth--;

        if (currentMonth < 0) {

            currentMonth = 11;

            currentYear--;
        }

        renderCalendar();

    });

    nextMonthBtn.addEventListener("click", () => {

        currentMonth++;

        if (currentMonth > 11) {

            currentMonth = 0;

            currentYear++;
        }

        renderCalendar();

    });
}

// LOGOUT

function initializeLogout() {

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";

    });
}