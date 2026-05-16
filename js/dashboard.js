// CHECK AUTHENTICATION

const currentUser =
    Storage.getCurrentUser();

if (!currentUser) {

    window.location.href =
        "index.html";
}

// DOM ELEMENT

const welcomeMessage =
    document.getElementById(
        "welcomeMessage"
    );

const cycleLengthDisplay =
    document.getElementById(
        "cycleLengthDisplay"
    );

const nextPeriodDate =
    document.getElementById(
        "nextPeriodDate"
    );

const ovulationDate =
    document.getElementById(
        "ovulationDate"
    );

const currentMood =
    document.getElementById(
        "currentMood"
    );

const activityContainer =
    document.getElementById(
        "activityContainer"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

// INITIALIZATION

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadUserInformation();

        loadPredictionData();

        loadMoodData();

        loadRecentActivities();

        initializeLogout();
    }
);

// LOAD USER INFORMATION

function loadUserInformation() {

    if (!currentUser) return;

    // Welcome Message

    welcomeMessage.textContent =
        `Welcome Back, ${currentUser.name}`;

    // Cycle Length

    cycleLengthDisplay.textContent =
        `${currentUser.cycleLength} Days`;
}

// LOAD PERIOD PREDICTION

function loadPredictionData() {

    const periodLogs =
        Storage.getPeriodLogs();

    // Current user logs

    const userLogs =
        periodLogs.filter(
            log =>
                log.userId === currentUser.id
        );

    // No logs available

    if (userLogs.length === 0) {

        nextPeriodDate.textContent =
            "No Data";

        ovulationDate.textContent =
            "No Data";

        return;
    }

    // Latest period log

    const latestLog =
        userLogs[userLogs.length - 1];

    const lastPeriodDate =
        new Date(latestLog.date);

    // Next Period Date

    const nextDate =
        new Date(lastPeriodDate);

    nextDate.setDate(
        nextDate.getDate() +
        currentUser.cycleLength
    );

    // Ovulation Date

    const ovulation =
        new Date(nextDate);

    ovulation.setDate(
        ovulation.getDate() - 14
    );

    // Display

    nextPeriodDate.textContent =
        formatDate(nextDate);

    ovulationDate.textContent =
        formatDate(ovulation);
}

// LOAD MOOD DATA

function loadMoodData() {

    const moodLogs =
        Storage.getMoodLogs();

    const userMoods =
        moodLogs.filter(
            mood =>
                mood.userId === currentUser.id
        );

    if (userMoods.length === 0) {

        currentMood.textContent =
            "Relaxed";

        return;
    }

    const latestMood =
        userMoods[userMoods.length - 1];

    currentMood.textContent =
        latestMood.mood;
}

// LOAD RECENT ACTIVITIES 

function loadRecentActivities() {

    const moodLogs =
        Storage.getMoodLogs();

    const symptomLogs =
        Storage.getSymptomLogs();

    const userMoods =
        moodLogs.filter(
            mood =>
                mood.userId === currentUser.id
        );

    const userSymptoms =
        symptomLogs.filter(
            symptom =>
                symptom.userId === currentUser.id
        );

    let activities = [];

    // Mood activities

    userMoods.forEach(item => {

        activities.push({

            type: "Mood",

            value: item.mood,

            date: item.date
        });
    });

    // Symptom activities

    userSymptoms.forEach(item => {

        activities.push({

            type: "Symptom",

            value: item.symptom,

            date: item.date
        });
    });

    // Sort latest first

    activities.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );

    // Empty activity

    if (activities.length === 0) {

        activityContainer.innerHTML = `

            <div class="activity-item">

                <i class="fa-solid fa-circle-info"></i>

                <div>

                    <h4>
                        No activity available
                    </h4>

                    <p>
                        Start tracking your wellness today.
                    </p>

                </div>

            </div>
        `;

        return;
    }

    // Latest 5 activities

    const latestActivities =
        activities.slice(0, 5);

    activityContainer.innerHTML = "";

    latestActivities.forEach(
        activity => {

            const activityHTML = `

                <div class="activity-item">

                    <i class="fa-solid fa-heart"></i>

                    <div>

                        <h4>

                            ${activity.type}:
                            ${activity.value}

                        </h4>

                        <p>

                            ${formatDate(
                                activity.date
                            )}

                        </p>

                    </div>

                </div>
            `;

            activityContainer.innerHTML +=
                activityHTML;
        }
    );
}

// LOGOUT SYSTEM

function initializeLogout() {

    if (!logoutBtn) return;

    logoutBtn.addEventListener(
        "click",
        function () {

            // Remove current session

            localStorage.removeItem(
                "currentUser"
            );

            // Redirect

            window.location.href =
                "index.html";
        }
    );
}

// DATE FORMATTER

function formatDate(dateValue) {

    const date =
        new Date(dateValue);

    return date.toLocaleDateString(
        "en-IN",
        {

            day: "numeric",

            month: "short",

            year: "numeric"
        }
    );
}