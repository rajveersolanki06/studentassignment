// Get assignments from localStorage
// If there are no assignments, create sample assignments
function loadAssignments() {

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

    return assignments;
}


// Load assignments
var assignments = loadAssignments();

// Get current user
var user = getCurrentUser();


// Display assignment table
var assignmentTable =
    document.getElementById("assignmentTable");


if (assignmentTable && user) {

    // Hide Add Assignment button for student
    if (user.role === "student") {

        document.getElementById("addAssignmentBtn").style.display =
            "none";
    }


    for (var i = 0; i < assignments.length; i++) {

        var assignment = assignments[i];

        var statusText = "Pending";

        var actionHTML = "";


        // Student actions
        if (user.role === "student") {

            var submission =
                assignment.submissions[user.email];


            if (
                submission &&
                submission.status === "Submitted"
            ) {

                statusText = "Submitted";

                actionHTML =
                    "<span class='small-text'>" +
                    "Submitted on " +
                    submission.date +
                    "</span>";

            } else {

                actionHTML =
                    "<button class='small-btn submit-btn' " +
                    "data-id='" + assignment.id + "'>" +
                    "Mark as Submitted" +
                    "</button>";
            }
        }


        // Teacher actions
        else {

            actionHTML =
                "<a class='small-btn' href='add-assignment.html?id=" +
                assignment.id +
                "'>Edit</a>" +

                "<button class='small-btn delete-btn " +
                "delete-btn-action' data-id='" +
                assignment.id +
                "'>" +
                "Delete" +
                "</button>";
        }


        var row = document.createElement("tr");


        row.innerHTML =
            "<td>" + assignment.title + "</td>" +
            "<td>" + assignment.subject + "</td>" +
            "<td>" + assignment.description + "</td>" +
            "<td>" + assignment.teacher + "</td>" +
            "<td>" + assignment.deadline + "</td>" +

            "<td><span class='status " +

            (
                statusText === "Submitted"
                    ? "status-submitted"
                    : "status-pending"
            ) +

            "'>" +
            statusText +
            "</span></td>" +

            "<td>" +
            actionHTML +
            "</td>";


        assignmentTable.appendChild(row);
    }
}


// Mark assignment as submitted
var submitButtons =
    document.querySelectorAll(".submit-btn");


for (var i = 0; i < submitButtons.length; i++) {

    submitButtons[i].addEventListener(
        "click",
        function() {

            var id =
                Number(this.getAttribute("data-id"));

            var assignments =
                loadAssignments();


            for (var j = 0; j < assignments.length; j++) {

                if (assignments[j].id === id) {

                    if (!assignments[j].submissions) {
                        assignments[j].submissions = {};
                    }


                    assignments[j].submissions[user.email] = {

                        status: "Submitted",

                        date:
                            new Date().toLocaleDateString()

                    };

                    break;
                }
            }


            localStorage.setItem(
                "assignments",
                JSON.stringify(assignments)
            );


            alert(
                "Assignment marked as submitted."
            );

            window.location.reload();

        }
    );
}


// Delete assignment
var deleteButtons =
    document.querySelectorAll(".delete-btn-action");


for (var k = 0; k < deleteButtons.length; k++) {

    deleteButtons[k].addEventListener(
        "click",
        function() {

            var id =
                Number(this.getAttribute("data-id"));


            // Confirmation before deleting
            var answer = confirm(
                "Are you sure you want to delete this assignment?"
            );


            if (answer) {

                var assignments =
                    loadAssignments();

                var newAssignments = [];


                for (var m = 0; m < assignments.length; m++) {

                    if (assignments[m].id !== id) {

                        newAssignments.push(
                            assignments[m]
                        );
                    }
                }


                localStorage.setItem(
                    "assignments",
                    JSON.stringify(newAssignments)
                );


                window.location.reload();
            }

        }
    );
}


// Add / Edit Assignment Form
var assignmentForm =
    document.getElementById("assignmentForm");


if (assignmentForm) {

    // Get ID from URL
    var params =
        new URLSearchParams(window.location.search);

    var editId =
        Number(params.get("id"));


    // If ID exists, this is Edit mode
    if (editId) {

        document.getElementById("formHeading").textContent =
            "Edit Assignment";

        document.getElementById("formTitle").textContent =
            "Edit Assignment - Assignment Management";

        document.getElementById("saveButton").textContent =
            "Save Changes";


        var editAssignment = null;


        for (var e = 0; e < assignments.length; e++) {

            if (assignments[e].id === editId) {

                editAssignment =
                    assignments[e];

                break;
            }
        }


        // Put old values into the form
        if (editAssignment) {

            document.getElementById("title").value =
                editAssignment.title;

            document.getElementById("subject").value =
                editAssignment.subject;

            document.getElementById("description").value =
                editAssignment.description;

            document.getElementById("deadline").value =
                editAssignment.deadline;

            document.getElementById("teacher").value =
                editAssignment.teacher;
        }
    }


    // Submit form
    assignmentForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            var title =
                document.getElementById("title").value.trim();

            var subject =
                document.getElementById("subject").value.trim();

            var description =
                document.getElementById("description").value.trim();

            var deadline =
                document.getElementById("deadline").value;

            var teacher =
                document.getElementById("teacher").value.trim();


            var assignments =
                loadAssignments();


            // Edit existing assignment
            if (editId) {

                for (var x = 0; x < assignments.length; x++) {

                    if (assignments[x].id === editId) {

                        assignments[x].title =
                            title;

                        assignments[x].subject =
                            subject;

                        assignments[x].description =
                            description;

                        assignments[x].deadline =
                            deadline;

                        assignments[x].teacher =
                            teacher;

                        break;
                    }
                }


                localStorage.setItem(
                    "assignments",
                    JSON.stringify(assignments)
                );


                alert(
                    "Assignment updated successfully."
                );

            }


            // Add new assignment
            else {

                var newAssignment = {

                    id: new Date().getTime(),

                    title: title,

                    subject: subject,

                    description: description,

                    deadline: deadline,

                    teacher: teacher,

                    submissions: {}
                };


                assignments.push(
                    newAssignment
                );


                localStorage.setItem(
                    "assignments",
                    JSON.stringify(assignments)
                );


                alert(
                    "Assignment added successfully."
                );
            }


            window.location.href =
                "assignments.html";

        }
    );
}