// Create sample assignments when the project is opened for the first time
function createSampleAssignments() {

    var assignments =
        JSON.parse(localStorage.getItem("assignments"));

    if (!assignments) {

        assignments = [

            {
                id: 1,
                title: "HTML and CSS Website",
                subject: "Web Programming",
                description:
                    "Create a simple website using HTML and CSS.",
                teacher: "Prof. Sharma",
                deadline: "2026-09-15",
                submissions: {}
            },

            {
                id: 2,
                title: "Array Operations",
                subject: "Data Structures",
                description:
                    "Write programs to perform basic array operations.",
                teacher: "Prof. Verma",
                deadline: "2026-09-18",
                submissions: {}
            },

            {
                id: 3,
                title: "Memory Organization",
                subject:
                    "Digital Computer Organisation",
                description:
                    "Prepare notes on memory hierarchy and cache memory.",
                teacher: "Prof. Singh",
                deadline: "2026-09-20",
                submissions: {}
            },

            {
                id: 4,
                title: "ER Diagram",
                subject: "Database Management",
                description:
                    "Create an ER diagram for a student management system.",
                teacher: "Prof. Mehta",
                deadline: "2026-09-23",
                submissions: {}
            },

            {
                id: 5,
                title: "Differentiation Problems",
                subject: "Mathematics",
                description:
                    "Solve the given problems based on differentiation.",
                teacher: "Prof. Patel",
                deadline: "2026-09-25",
                submissions: {}
            }

        ];

        localStorage.setItem(
            "assignments",
            JSON.stringify(assignments)
        );
    }
}


// Make sure sample assignments exist
createSampleAssignments();


// Get logged-in user
var user = getCurrentUser();

if (user) {

    var assignments =
        JSON.parse(localStorage.getItem("assignments")) || [];

    var submitted = 0;
    var pending = 0;
    var upcoming = 0;


    // Calculate student statistics
    for (var i = 0; i < assignments.length; i++) {

        var submission =
            assignments[i].submissions[user.email];

        if (user.role === "student") {

            if (
                submission &&
                submission.status === "Submitted"
            ) {
                submitted++;
            } else {
                pending++;
            }

            var today = new Date();
            var deadline =
                new Date(assignments[i].deadline);

            if (deadline >= today) {
                upcoming++;
            }
        }
    }


    // Total assignments
    document.getElementById("totalAssignments").textContent =
        assignments.length;


    // Student Dashboard
    if (user.role === "student") {

        document.getElementById("dashboardTitle").textContent =
            "Student Dashboard";

        document.getElementById("submittedAssignments").textContent =
            submitted;

        document.getElementById("pendingAssignments").textContent =
            pending;

        document.getElementById("fourthCardTitle").textContent =
            "Upcoming Assignments";

        document.getElementById("fourthCardValue").textContent =
            upcoming;


        // Hide teacher menu
        document.getElementById("addLink").style.display = "none";

        document.getElementById("studentsLink").style.display = "none";

        document.getElementById("submissionsLink").style.display =
            "none";
    }


    // Teacher Dashboard
    else {

        document.getElementById("dashboardTitle").textContent =
            "Teacher Dashboard";

        var students =
            JSON.parse(localStorage.getItem("students")) || [];

        var totalSubmitted = 0;
        var totalPending = 0;


        // Count all student submissions
        for (var s = 0; s < students.length; s++) {

            for (var a = 0; a < assignments.length; a++) {

                var studentSubmission =
                    assignments[a].submissions[students[s].email];

                if (
                    studentSubmission &&
                    studentSubmission.status === "Submitted"
                ) {
                    totalSubmitted++;
                } else {
                    totalPending++;
                }

            }
        }


        document.getElementById("submittedAssignments").textContent =
            totalSubmitted;

        document.getElementById("pendingAssignments").textContent =
            totalPending;

        document.getElementById("fourthCardTitle").textContent =
            "Total Students";

        document.getElementById("fourthCardValue").textContent =
            students.length;
    }


    // Display recent assignments
    var recentTable =
        document.getElementById("recentAssignments");

    for (var j = 0; j < assignments.length; j++) {

        var row = document.createElement("tr");

        var statusText = "Pending";


        if (
            user.role === "student" &&
            assignments[j].submissions[user.email] &&
            assignments[j].submissions[user.email].status ===
            "Submitted"
        ) {

            statusText = "Submitted";
        }


        row.innerHTML =
            "<td>" + assignments[j].title + "</td>" +
            "<td>" + assignments[j].subject + "</td>" +
            "<td>" + assignments[j].teacher + "</td>" +
            "<td>" + assignments[j].deadline + "</td>" +
            "<td><span class='status " +
            (
                statusText === "Submitted"
                    ? "status-submitted"
                    : "status-pending"
            ) +
            "'>" + statusText + "</span></td>";

        recentTable.appendChild(row);
    }
}