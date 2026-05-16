
const Storage = {

    // USERS

    getUsers() {

        return JSON.parse(
            localStorage.getItem("users")
        ) || [];
    },

    saveUsers(users) {

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
    },

    // CURRENT USER

    getCurrentUser() {

        return JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );
    },

    setCurrentUser(user) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );
    },

    // PERIOD LOGS

    getPeriodLogs() {

        return JSON.parse(
            localStorage.getItem(
                "periodLogs"
            )
        ) || [];
    },

    savePeriodLogs(logs) {

        localStorage.setItem(
            "periodLogs",
            JSON.stringify(logs)
        );
    },


    // MOOD LOGS

    getMoodLogs() {

        return JSON.parse(
            localStorage.getItem(
                "moodLogs"
            )
        ) || [];
    },

    saveMoodLogs(logs) {

        localStorage.setItem(
            "moodLogs",
            JSON.stringify(logs)
        );
    },

    // SYMPTOM LOGS

    getSymptomLogs() {

        return JSON.parse(
            localStorage.getItem(
                "symptomLogs"
            )
        ) || [];
    },

    saveSymptomLogs(logs) {

        localStorage.setItem(
            "symptomLogs",
            JSON.stringify(logs)
        );
    }
};