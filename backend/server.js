const express = require("express");
const cors = require("cors");
const fs = require("fs");


const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

const FILE = path.join(__dirname, "students.json");

console.log("Using file:", FILE);

app.use(
    express.static(
        path.join(__dirname, "frontend")
    )
);
// Get all students
app.get("/students", (req, res) => {
    const students = JSON.parse(fs.readFileSync(FILE));
    res.json(students);
});

// Add student
app.post("/students", (req, res) => {
    console.log("BODY RECEIVED:");
console.log(req.body);
    const students = JSON.parse(fs.readFileSync(FILE));

    console.log("BODY RECEIVED:");
console.log(req.body);

const student = {
    id: Date.now(),
    name: req.body.name,
    roll: req.body.roll,
    obtainedMarks: req.body.obtainedMarks,
    totalMarks: req.body.totalMarks
};

    students.push(student);

    fs.writeFileSync(FILE, JSON.stringify(students, null, 2));

    res.json(student);
});

// Delete student
app.delete("/students/:id", (req, res) => {

    const students = JSON.parse(fs.readFileSync(FILE));

    const updated = students.filter(
        s => s.id != req.params.id
    );

    fs.writeFileSync(FILE, JSON.stringify(updated, null, 2));

    res.json({
        message: "Deleted"
    });
});
app.put("/students/:id",(req,res)=>{

    const students =
    JSON.parse(fs.readFileSync(FILE));

    const updated =
    students.map(student=>{

        if(student.id == req.params.id){

            student.obtainedMarks =
            req.body.obtainedMarks;

            student.totalMarks =
            req.body.totalMarks;
        }

        return student;
    });

    fs.writeFileSync(
        FILE,
        JSON.stringify(updated,null,2)
    );

    res.json({
        message:"Updated"
    });
});

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "frontend/index.html")
    );
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});