// DOM ELEMENTS

const registerForm =
    document.getElementById("registerForm");

const loginForm =
    document.getElementById("loginForm");

// REGISTER SYSTEM

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        handleRegister
    );
}

function handleRegister(e) {

    e.preventDefault();

    // INPUT VALUES

    const name =
        document.getElementById("name")
        .value.trim();

    const email =
        document.getElementById("email")
        .value.trim();

    const age =
        document.getElementById("age")
        .value.trim();

    const cycleLength =
        document.getElementById("cycleLength")
        .value.trim();

    const password =
        document.getElementById("password")
        .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
        .value;

    // VALIDATION
 

    if (
        !name ||
        !email ||
        !age ||
        !cycleLength ||
        !password ||
        !confirmPassword
    ) {

        alert("Please fill all fields");

        return;
    }

    if (name.length < 3) {

        alert(
            "Name must be at least 3 characters"
        );

        return;
    }

    if (!email.includes("@")) {

        alert("Invalid email address");

        return;
    }

    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters"
        );

        return;
    }

    if (password !== confirmPassword) {

        alert("Passwords do not match");

        return;
    }

    if (
        cycleLength < 21 ||
        cycleLength > 40
    ) {

        alert(
            "Cycle length must be between 21 and 40 days"
        );

        return;
    }

    // GET USERS

    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    // CHECK DUPLICATE EMAIL

    const existingUser =
        users.find(
            user => user.email === email
        );

    if (existingUser) {

        alert("Email already registered");

        return;
    }

    // CREATE NEW USER 

    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        age: Number(age),

        cycleLength:
            Number(cycleLength),

        password: password,

        createdAt:
            new Date().toISOString()
    };

    // SAVE USER
    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    // SUCCESS
    alert("Registration successful!");

    registerForm.reset();

    // REDIRECT TO LOGIN

    window.location.href =
        "index.html";
}

// LOGIN SYSTEM

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        handleLogin
    );
}

function handleLogin(e) {

    e.preventDefault();

    // 
    // INPUT VALUES
    // 

    const email =
        document.getElementById("email")
        .value.trim();

    const password =
        document.getElementById("password")
        .value;

    // VALIDATION

    if (!email || !password) {

        alert("Please fill all fields");

        return;
    }

    // GET USERS

    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    // FIND USER

    const user =
        users.find(
            user =>

                user.email === email &&
                user.password === password
        );

    if (!user) {

        alert(
            "Invalid email or password"
        );

        return;
    }

    // SAVE SESSION

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    // SUCCESS

    alert(`Welcome ${user.name}!`);

    // REDIRECT 

    window.location.href =
        "dashboard.html";
}