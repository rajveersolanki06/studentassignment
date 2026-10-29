// Demo login users
var demoUsers = [
    {
        email: "student@gmail.com",
        password: "123456",
        role: "student",
        name: "Student"
    },
    {
        email: "teacher@gmail.com",
        password: "123456",
        role: "teacher",
        name: "Teacher"
    }
];


// Login form
var loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        // Stop the form from refreshing the page
        event.preventDefault();

        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value;
        var role = document.getElementById("role").value;

        var message = document.getElementById("loginMessage");

        var validUser = false;

        // Check the entered details
        for (var i = 0; i < demoUsers.length; i++) {

            if (
                demoUsers[i].email === email &&
                demoUsers[i].password === password &&
                demoUsers[i].role === role
            ) {

                validUser = true;

                // Store logged-in user in localStorage
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                        email: demoUsers[i].email,
                        role: demoUsers[i].role,
                        name: demoUsers[i].name
                    })
                );

                // Open dashboard
                window.location.href = "dashboard.html";

                break;
            }
        }

        if (!validUser) {
            message.textContent =
                "Invalid email, password or role.";
        }

    });

}


// Logout
var logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    });

}


// Get current logged-in user
function getCurrentUser() {

    var user = localStorage.getItem("currentUser");

    if (user) {
        return JSON.parse(user);
    }

    return null;
}


// Protect pages that require login
var currentUser = getCurrentUser();

if (
    !currentUser &&
    (
        window.location.pathname.includes("dashboard.html") ||
        window.location.pathname.includes("assignments.html") ||
        window.location.pathname.includes("add-assignment.html") ||
        window.location.pathname.includes("students.html") ||
        window.location.pathname.includes("submissions.html")
    )
) {

    window.location.href = "login.html";
}


// Display current user in navbar
var welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser && currentUser) {

    welcomeUser.textContent =
        "Hello, " + currentUser.name;

}