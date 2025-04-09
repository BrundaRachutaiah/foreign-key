let express = require('express')
let {sequelize} = require('./config/database')
let student = require('./models/student')
let classroom = require('./models/classroom')
const teacher = require('./models/teacher')
const PORT = 3000
const app = express()
app.use(express.json())

let teachers = [
  { name: 'Mrs. Sharma', email: 'sharma@example.com' },
  { name: 'Mr. Verma', email: 'verma@example.com' },
];

let classrooms = [
  { name: 'Mathematics', teacherId: 1},
  { name: 'Physics', teacherId: 2 },
  { name: 'Chemistry', teacherId: 2 },
];

let studentData = [
  {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    age: 21,
    ClassroomId: 1,
  },
  {
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    age: 22,
    ClassroomId: 2,
  },
  {
    name: 'Amit Verma',
    email: 'amit.verma@example.com',
    age: 20,
    ClassroomId: 1,
  },
  {
    name: 'Sonal Kaur',
    email: 'sonal.kaur@example.com',
    age: 19,
    ClassroomId: 3,
  },
];


app.get("/seed_db", async (req,res) => {
  try {
    await sequelize.sync({force:true})
    await student.bulkCreate(studentData)
    await classroom.bulkCreate(classrooms)
    await teacher.bulkCreate(teachers)
    res.status(200).json({message: "Database seeded with multiple records and foreign key relationships!"})
  } catch (error) {
    res.status(500).json({message: "Error while seeding the data", error:error.message})
  }
});


app.listen(PORT,() => {
    console.log(`server running on localhost ${PORT}`)
})