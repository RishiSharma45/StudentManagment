const API = "";

async function loadStudents() {

    const search =
document.getElementById("search")
?.value
?.toLowerCase() || "";

    const res = await fetch(`${API}/students`);

    const data = await res.json();

    const table =
        document.getElementById("studentsTable");

    table.innerHTML = "";

    data
.filter(student =>
student.name.toLowerCase().includes(search) ||
student.roll.toString().includes(search)
)
.forEach(student => {

        table.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.obtainedMarks}</td>
            <td>${student.totalMarks}</td>

<td>
${(
(student.obtainedMarks /
student.totalMarks) * 100
).toFixed(2)}%
</td>

            <td>
                <button onclick="editStudent(${student.id})">
Edit
</button>

<button class="delete-btn"
onclick="deleteStudent(${student.id})">
Delete
</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalStudents")
.innerText = data.length;

let totalObtained = 0;
let classTotalMarks = 0;
let topper = 0;

data.forEach(student => {

    totalObtained += Number(student.obtainedMarks);

    classTotalMarks += Number(student.totalMarks);

    let percentage =
        (student.obtainedMarks /
         student.totalMarks) * 100;

    if (percentage > topper) {
        topper = percentage;
    }
});

document.getElementById("classTotalMarks")
.innerText = classTotalMarks;

document.getElementById("topperPercentage")
.innerText = topper.toFixed(2) + "%";

document.getElementById("totalMarks")
.innerText = totalObtained;

let totalPercentage = 0;

data.forEach(student => {

    totalPercentage +=
    (student.obtainedMarks /
    student.totalMarks) * 100;

});

let avg = 0;

if(data.length > 0){
    avg =
    (totalPercentage /
    data.length).toFixed(2);
}

document.getElementById("averageMarks")
.innerText = avg;
}

async function addStudent() {

    const name =
        document.getElementById("name").value;

    const roll =
        document.getElementById("roll").value;

    const obtainedMarks =
document.getElementById("obtainedMarks").value;

const totalMarks =
document.getElementById("totalMarksInput").value;

console.log("SENDING DATA:");
console.log({
    name,
    roll,
    obtainedMarks,
    totalMarks
});

await fetch(`${API}/students`, {

        method: "POST",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
    name,
    roll,
    obtainedMarks,
    totalMarks
})
    });

    loadStudents();
}

async function deleteStudent(id) {

    await fetch(`${API}/students/${id}`, {
        method: "DELETE"
    });

    loadStudents();
}

async function editStudent(id){

    let newMarks =
    prompt("Enter New Obtained Marks");

    let newTotal =
    prompt("Enter New Total Marks");

    await fetch(`${API}/students/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            obtainedMarks:newMarks,
            totalMarks:newTotal
        })
    });

    loadStudents();
}

async function editStudent(id){

    let newMarks =
    prompt("Enter New Obtained Marks");

    let newTotal =
    prompt("Enter New Total Marks");

    await fetch(`${API}/students/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            obtainedMarks:newMarks,
            totalMarks:newTotal
        })
    });

    loadStudents();
}

loadStudents();