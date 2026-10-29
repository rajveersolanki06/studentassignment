// Get students from localStorage
var students =
    JSON.parse(localStorage.getItem("students")) || [];


// Get assignments from localStorage
var assignments =
    JSON.parse(localStorage.getItem("assignments")) || [];


// Get submission table
var submissionTable =
    document.getElementById("submissionTable");


if (submissionTable) {

    // Check every student
    for (var i = 0; i < students.length; i++) {

        // Check every assignment
        for (var j = 0; j < assignments.length; j++) {

            var submission =
                assignments[j].submissions[
                    students[i].email
                ];

            var status = "Pending";

            var date = "-";


            // If student submitted the assignment
            if (
                submission &&
                submission.status === "Submitted"
            ) {

                status = "Submitted";

                date = submission.date;
            }


            var row =
                document.createElement("tr");


            row.innerHTML =

                "<td>" +
                students[i].name +
                "</td>" +

                "<td>" +
                assignments[j].title +
                "</td>" +

                "<td>" +
                assignments[j].subject +
                "</td>" +

                "<td>" +
                date +
                "</td>" +

                "<td><span class='status " +

                (
                    status === "Submitted"
                        ? "status-submitted"
                        : "status-pending"
                ) +

                "'>" +
                status +
                "</span></td>";


            submissionTable.appendChild(row);
        }
    }
}