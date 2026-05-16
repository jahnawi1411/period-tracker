// AUTH CHECK

checkAuth();

const currentUser = Storage.getCurrentUser();

// DOM ELEMENTS

const totalMoodLogs =
    document.getElementById("totalMoodLogs");

const totalSymptomLogs =
    document.getElementById("totalSymptomLogs");

const cycleLengthDisplay =
    document.getElementById("cycleLengthDisplay");

const commonMood =
    document.getElementById("commonMood");

const summaryContainer =
    document.getElementById("summaryContainer");

const logoutBtn =
    document.getElementById("logoutBtn");

// INITIALIZATION

document.addEventListener("DOMContentLoaded", () => {

    loadInsightCards();

    renderMoodChart();

    renderSymptomChart();

    renderMonthlySummary();

    initializeLogout();

});

// LOAD INSIGHT CARDS

function loadInsightCards() {

    const moodLogs =
        Storage.getMoodLogs().filter(
            log => log.userId === currentUser.id
        );

    const symptomLogs =
        Storage.getSymptomLogs().filter(
            log => log.userId === currentUser.id
        );

    // Total Mood Logs
    totalMoodLogs.textContent =
        moodLogs.length;

    // Total Symptom Logs
    totalSymptomLogs.textContent =
        symptomLogs.length;

    // Cycle Length
    cycleLengthDisplay.textContent =
        `${currentUser.cycleLength} Days`;

    // Most Common Mood
    commonMood.textContent =
        getMostCommonMood(moodLogs);
}

// MOST COMMON MOOD

function getMostCommonMood(moods) {

    if (moods.length === 0) {
        return "--";
    }

    const moodCount = {};

    moods.forEach(item => {

        if (!moodCount[item.mood]) {
            moodCount[item.mood] = 0;
        }

        moodCount[item.mood]++;
    });

    let highestMood = "";
    let highestCount = 0;

    for (let mood in moodCount) {

        if (moodCount[mood] > highestCount) {

            highestMood = mood;

            highestCount = moodCount[mood];
        }
    }

    return highestMood;
}

// MOOD CHART

function renderMoodChart() {

    const moodLogs =
        Storage.getMoodLogs().filter(
            log => log.userId === currentUser.id
        );

    const moodFrequency = {};

    moodLogs.forEach(log => {

        if (!moodFrequency[log.mood]) {
            moodFrequency[log.mood] = 0;
        }

        moodFrequency[log.mood]++;
    });

    const labels =
        Object.keys(moodFrequency);

    const data =
        Object.values(moodFrequency);

    const ctx =
        document.getElementById("moodChart");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Mood Frequency",

                data: data,

                borderWidth: 1
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    display: false
                }
            },

            scales: {

                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// SYMPTOM CHART

function renderSymptomChart() {

    const symptomLogs =
        Storage.getSymptomLogs().filter(
            log => log.userId === currentUser.id
        );

    const symptomFrequency = {};

    symptomLogs.forEach(log => {

        if (!symptomFrequency[log.symptom]) {
            symptomFrequency[log.symptom] = 0;
        }

        symptomFrequency[log.symptom]++;
    });

    const labels =
        Object.keys(symptomFrequency);

    const data =
        Object.values(symptomFrequency);

    const ctx =
        document.getElementById("symptomChart");

    new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: labels,

            datasets: [{

                label: "Symptoms",

                data: data,

                borderWidth: 1
            }]
        },

        options: {

            responsive: true
        }
    });
}

// MONTHLY SUMMARY

function renderMonthlySummary() {

    const trackerLogs =
        Storage.getTrackerLogs().filter(
            log => log.userId === currentUser.id
        );

    if (trackerLogs.length === 0) {

        summaryContainer.innerHTML = `
            <div class="summary-item">
                <p>
                    No wellness summary available yet.
                </p>
            </div>
        `;

        return;
    }

    const latestLog =
        trackerLogs[trackerLogs.length - 1];

    summaryContainer.innerHTML = `
        <div class="summary-item">

            <p>
                Your latest wellness record shows
                a mood of
                <strong>${latestLog.mood}</strong>
                with
                <strong>
                    ${latestLog.symptoms.length}
                </strong>
                symptoms tracked.
            </p>

        </div>

        <div class="summary-item">

            <p>
                Flow Level:
                <strong>
                    ${latestLog.flowLevel || "N/A"}
                </strong>
            </p>

        </div>

        <div class="summary-item">

            <p>
                Energy Level:
                <strong>
                    ${latestLog.energyLevel || "N/A"}
                </strong>
            </p>

        </div>

        <div class="summary-item">

            <p>
                Notes:
                <strong>
                    ${latestLog.notes || "No notes"}
                </strong>
            </p>

        </div>
    `;
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