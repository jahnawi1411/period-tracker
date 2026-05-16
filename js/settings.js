// AUTH CHECK

checkAuth();

let currentUser =
    Storage.getCurrentUser();

// DOM ELEMENTS

const profileForm =
    document.getElementById("profileForm");

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const age =
    document.getElementById("age");

const cycleLength =
    document.getElementById("cycleLength");

const darkModeToggle =
    document.getElementById("darkModeToggle");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

// INITIALIZATION

document.addEventListener("DOMContentLoaded", () => {

    loadUserProfile();

    initializeProfileUpdate();

    initializeDarkMode();

    initializeClearHistory();

    initializeLogout();

});

// LOAD USER DATA

function loadUserProfile() {

    fullName.value =
        currentUser.name || "";

    email.value =
        currentUser.email || "";

    age.value =
        currentUser.age || "";

    cycleLength.value =
        currentUser.cycleLength || "";

    // Dark Mode State
    const darkMode =
        localStorage.getItem("darkMode");

    if (darkMode === "enabled") {

        document.body.classList.add("dark-mode");

        darkModeToggle.checked = true;
    }
}

// PROFILE UPDATE

function initializeProfileUpdate() {

    profileForm.addEventListener(
        "submit",
        handleProfileUpdate
    );
}

function handleProfileUpdate(e) {

    e.preventDefault();

    const updatedName =
        fullName.value.trim();

    const updatedEmail =
        email.value.trim();

    const updatedAge =
        age.value.trim();

    const updatedCycleLength =
        cycleLength.value.trim();

    // VALIDATION

    if (
        !updatedName ||
        !updatedEmail ||
        !updatedAge ||
        !updatedCycleLength
    ) {

        showAlert(
            "Please fill all fields",
            "error"
        );

        return;
    }

    if (!validateEmail(updatedEmail)) {

        showAlert(
            "Invalid email address",
            "error"
        );

        return;
    }

    if (
        updatedCycleLength < 21 ||
        updatedCycleLength > 40
    ) {

        showAlert(
            "Cycle length must be between 21 and 40 days",
            "error"
        );

        return;
    }

    // UPDATE USER 

    const users =
        Storage.getUsers();

    const updatedUsers =
        users.map(user => {

            if (user.id === currentUser.id) {

                return {

                    ...user,

                    name: updatedName,

                    email: updatedEmail,

                    age: updatedAge,

                    cycleLength:
                        Number(updatedCycleLength)
                };
            }

            return user;
        });

    Storage.saveUsers(updatedUsers);

    // Update current user
    currentUser = {

        ...currentUser,

        name: updatedName,

        email: updatedEmail,

        age: updatedAge,

        cycleLength:
            Number(updatedCycleLength)
    };

    Storage.setCurrentUser(currentUser);

    showAlert(
        "Profile updated successfully!"
    );
}

// DARK MODE

function initializeDarkMode() {

    darkModeToggle.addEventListener(
        "change",
        () => {

            if (darkModeToggle.checked) {

                document.body.classList.add(
                    "dark-mode"
                );

                localStorage.setItem(
                    "darkMode",
                    "enabled"
                );

            } else {

                document.body.classList.remove(
                    "dark-mode"
                );

                localStorage.setItem(
                    "darkMode",
                    "disabled"
                );
            }
        }
    );
}

// CLEAR HISTORY

function initializeClearHistory() {

    clearHistoryBtn.addEventListener(
        "click",
        clearAllHistory
    );
}

function clearAllHistory() {

    const confirmClear = confirm(
        "This will permanently delete all your wellness history. Continue?"
    );

    if (!confirmClear) return;

    // REMOVE TRACKER LOGS

    const trackerLogs =
        Storage.getTrackerLogs();

    const updatedTrackerLogs =
        trackerLogs.filter(
            log => log.userId !== currentUser.id
        );

    Storage.saveTrackerLogs(
        updatedTrackerLogs
    );

    // REMOVE MOOD LOGS

    const moodLogs =
        Storage.getMoodLogs();

    const updatedMoodLogs =
        moodLogs.filter(
            log => log.userId !== currentUser.id
        );

    Storage.saveMoodLogs(
        updatedMoodLogs
    );

    // REMOVE SYMPTOM LOGS 

    const symptomLogs =
        Storage.getSymptomLogs();

    const updatedSymptomLogs =
        symptomLogs.filter(
            log => log.userId !== currentUser.id
        );

    Storage.saveSymptomLogs(
        updatedSymptomLogs
    );

    // REMOVE PERIOD LOGS
    
    const periodLogs =
        Storage.getPeriodLogs();

    const updatedPeriodLogs =
        periodLogs.filter(
            log => log.userId !== currentUser.id
        );

    Storage.savePeriodLogs(
        updatedPeriodLogs
    );

    showAlert(
        "All wellness history cleared successfully!"
    );
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