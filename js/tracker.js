// AUTH CHECK

checkAuth();

const currentUser = Storage.getCurrentUser();

// DOM ELEMENTS

const trackerForm =
    document.getElementById("trackerForm");

const moodButtons =
    document.querySelectorAll(".mood-btn");

const recentLogsContainer =
    document.getElementById("recentLogsContainer");

const trackDate =
    document.getElementById("trackDate");

const logoutBtn =
    document.getElementById("logoutBtn");

// VARIABLES

let selectedMood = "";

// INITIALIZATION


document.addEventListener("DOMContentLoaded", () => {

    initializeDate();

    initializeMoodSelection();

    initializeFormSubmission();

    initializeLogout();

    loadRecentLogs();

});

// SET TODAY DATE

function initializeDate() {

    trackDate.value = getTodayDate();
}

// MOOD SELECTION

function initializeMoodSelection() {

    moodButtons.forEach(button => {

        button.addEventListener("click", () => {

            moodButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            selectedMood =
                button.dataset.mood;

        });

    });
}

// FORM SUBMISSION

function initializeFormSubmission() {

    trackerForm.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {

    e.preventDefault();

    const selectedSymptoms =
        getSelectedSymptoms();

    const flowLevel =
        document.getElementById("flowLevel").value;

    const energyLevel =
        document.getElementById("energyLevel").value;

    const dailyNotes =
        document.getElementById("dailyNotes").value.trim();

    const date =
        trackDate.value;

    const periodStart =
        document.querySelector(
            'input[name="periodStart"]:checked'
        ).value;

    // VALIDATION

    if (!date) {

        showAlert(
            "Please select a date",
            "error"
        );

        return;
    }

    if (!selectedMood) {

        showAlert(
            "Please select your mood",
            "error"
        );

        return;
    }

    // SAVE MOOD LOG

    const moodLogs =
        Storage.getMoodLogs();

    const moodData = {

        id: generateId(),

        userId: currentUser.id,

        mood: selectedMood,

        date: date
    };

    moodLogs.push(moodData);

    Storage.saveMoodLogs(moodLogs);

    // SAVE SYMPTOM LOGS

    const symptomLogs =
        Storage.getSymptomLogs();

    selectedSymptoms.forEach(symptom => {

        symptomLogs.push({

            id: generateId(),

            userId: currentUser.id,

            symptom: symptom,

            date: date
        });

    });

    Storage.saveSymptomLogs(symptomLogs);

    // 
    // SAVE PERIOD START
    // 

    if (periodStart === "yes") {

        const periodLogs =
            Storage.getPeriodLogs();

        periodLogs.push({

            id: generateId(),

            userId: currentUser.id,

            date: date
        });

        Storage.savePeriodLogs(periodLogs);
    }

        // SAVE COMPLETE TRACK LOG

    const trackerLogs =
        Storage.getTrackerLogs();

    const trackerData = {

        id: generateId(),

        userId: currentUser.id,

        mood: selectedMood,

        symptoms: selectedSymptoms,

        flowLevel: flowLevel,

        energyLevel: energyLevel,

        notes: dailyNotes,

        date: date,

        createdAt: new Date().toISOString()
    };

    trackerLogs.push(trackerData);

    Storage.saveTrackerLogs(trackerLogs);

    // SUCCESS

    showAlert(
        "Wellness record saved successfully!"
    );

    trackerForm.reset();

    resetMoodSelection();

    initializeDate();

    loadRecentLogs();
}

// GET SYMPTOMS

function getSelectedSymptoms() {

    const symptomCheckboxes =
        document.querySelectorAll(
            ".symptom-item input:checked"
        );

    let symptoms = [];

    symptomCheckboxes.forEach(item => {

        symptoms.push(item.value);

    });

    return symptoms;
}

// RESET MOOD

function resetMoodSelection() {

    selectedMood = "";

    moodButtons.forEach(button => {

        button.classList.remove("active");

    });
}
 
// LOAD RECENT LOGS

function loadRecentLogs() {

    const trackerLogs =
        Storage.getTrackerLogs();

    const userLogs =
        trackerLogs.filter(
            log => log.userId === currentUser.id
        );

    // Latest first
    userLogs.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );

    // Empty State
    if (userLogs.length === 0) {

        recentLogsContainer.innerHTML =
            createEmptyState(
                "No wellness records available."
            );

        return;
    }

    // Show latest 5
    const latestLogs =
        userLogs.slice(0, 5);

    recentLogsContainer.innerHTML = "";

    latestLogs.forEach(log => {

        const symptomHTML =
            log.symptoms.map(symptom => `
                <span class="log-tag">
                    ${symptom}
                </span>
            `).join("");

        const logHTML = `
            <div class="log-card">

                <div class="log-top">

                    <h3>${log.mood}</h3>

                    <span class="log-date">
                        ${formatDate(log.date)}
                    </span>

                </div>

                <div class="log-details">

                    ${symptomHTML}

                    <span class="log-tag">
                        Flow: ${log.flowLevel || "N/A"}
                    </span>

                    <span class="log-tag">
                        Energy: ${log.energyLevel || "N/A"}
                    </span>

                </div>

            </div>
        `;

        recentLogsContainer.innerHTML += logHTML;

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