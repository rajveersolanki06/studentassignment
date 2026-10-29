// Sample student data

var students = [

    {
        name: "Rahul Sharma",
        email: "student@gmail.com",
        course: "B.Tech IT",
        semester: "3rd Semester"
    },

    {
        name: "Aman Verma",
        email: "aman@gmail.com",
        course: "B.Tech IT",
        semester: "3rd Semester"
    },

    {
        name: "Priya Singh",
        email: "priya@gmail.com",
        course: "B.Tech IT",
        semester: "3rd Semester"
    },

    {
        name: "Neha Patel",
        email: "neha@gmail.com",
        course: "B.Tech IT",
        semester: "3rd Semester"
    },

    {
        name: "Rohit Mehta",
        email: "rohit@gmail.com",
        course: "B.Tech IT",
        semester: "3rd Semester"
    }

];


// Store students in localStorage
localStorage.setItem(
    "students",
    JSON.stringify(students)
);


// Get assignments
var assignments =
    JSON.parse(localStorage.getItem("assignments")) || [];


// Get table
var studentTable =
    document.getElementById("studentTable");


if (studentTable) {

    for (var i = 0; i < students.length; i++) {

        var submitted = 0;
        var pending = 0;


        // Check each assignment
        for (var j = 0; j < assignments.length; j++) {

            var submission =
                assignments[j].submissions[
                    students[i].email
                ];


            if (
                submission &&
                submission.status === "Submitted"
            ) {

                submitted++;

            } else {

                pending++;
            }
        }


        var row =
            document.createElement("tr");


        row.innerHTML =

            "<td>" +
            students[i].name +
            "</td>" +

            "<td>" +
            students[i].email +
            "</td>" +

            "<td>" +
            students[i].course +
            "</td>" +

            "<td>" +
            students[i].semester +
            "</td>" +

            "<td>" +
            submitted +
            "</td>" +

            "<td>" +
            pending +
            "</td>";


        studentTable.appendChild(row);
    }
}