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
    classroomId: 1,
  },
  {
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    age: 22,
    classroomId: 2,
  },
  {
    name: 'Amit Verma',
    email: 'amit.verma@example.com',
    age: 20,
    classroomId: 1,
  },
  {
    name: 'Sonal Kaur',
    email: 'sonal.kaur@example.com',
    age: 19,
    classroomId: 3,
  },
];


app.get("/seed_db", async (req,res) => {
  try {
    await sequelize.sync({force:true})
    await teacher.bulkCreate(teachers)
    await classroom.bulkCreate(classrooms)
    await student.bulkCreate(studentData)
    res.status(200).json({message: "Database seeded with multiple records and foreign key relationships!"})
  } catch (error) {
    res.status(500).json({message: "Error while seeding the data", error:error.message})
  }
});

async function getAllTeacher() {
  let result = await teacher.findAll()
  return result  
}

app.get("/teachers", async (req,res) => {
  try{
    let result = await getAllTeacher()
    if(result.length === 0){
      return res.status(404).json({message: "no teacher found"})
    }
    res.status(200).json(result)
  }catch(error){
    res.status(500).json({message: "Error in fetching the teacher", error:error.message})
  }
})

async function addNewTeacher(newTeacher){
  let result = await teacher.create(newTeacher)
  return result
}

app.post("/teachers", async (req,res) => {
  try {
    let newTeacher = req.body
    let result = await addNewTeacher(newTeacher)
    if(!result){
      res.status(404).json({message: "teacher is not added."})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while adding a new teacher", error:error.message})
  }
})

async function updateTeacherById(teacherId, updateValue) {
  let updatedValue = await teacher.findOne({where: {id: teacherId}})
  if(!teacher){
    return "Teacher not fount."
  }
  updatedValue.set(updateValue)
  let result = await updatedValue.save()
  return {message: `${updateValue} updated successfully`, result}
}

app.put("/teachers/:id", async (req,res) => {
  try {
    let teacherId = req.params.id
    let updateValue = req.body
    let result = await updateTeacherById(teacherId, updateValue)
    if(!result){
      return res.status(404).json({message: "no updation"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while updating a new teacher", error:error.message})
  }
})

async function deleteTeacherById(teacherId) {
  let result = await teacher.destroy({where: {id: teacherId}})
  return {message: "deleted successfully", result}
}

app.delete("/teachers/:id", async (req,res) => {
  try {
    let teacherId = req.params.id
    let result = await deleteTeacherById(teacherId)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while deleting a teacher", error:error.message})
  }
})

async function getAllClassroom() {
  let result = await classroom.findAll()
  return result
}

app.get("/classrooms", async (req,res) => {
  try {
    let result = await getAllClassroom()
    if(result.length === 0) {
      return res.status(400).json({message: "no classroom found"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while fetching classrooms", error:error.message})
  }
})

async function addNewClassroom(newClassroom) {
  let result = await classroom.create(newClassroom)
  return result
}

app.post("/classrooms", async (req,res) => {
  try {
    let newClassroom = req.body
    let result = await addNewClassroom(newClassroom)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while adding a new classroom", error:error.message})
  }
})

async function updateClassroomById(ClassroomId,updateValue) {
  let updatedClassroomId = await classroom.findOne({where: {id: ClassroomId}})
  if(!updatedClassroomId){
    return "classroom not present"
  }
  updatedClassroomId.set(updateValue)
  let result = await updatedClassroomId.save()
  return {message: "updation successfull", result}
}

app.put("/classrooms/:id", async (req,res) => {
  try {
    let ClassroomId = req.params.id
    let updateValue = req.body
    let result = await updateClassroomById(ClassroomId, updateValue)
    if(!result){
      res.status(404).json({message: "Updation failed"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while updating a classroom", error:error.message})
  }
})

async function deleteClassroomById(classroomId) {
  let result = await classroom.destroy({where: {id: classroomId}})
  return {message: "deletion successfull."}
}

app.delete("/classrooms/:id", async (req,res) => {
  try {
    let classroomId = req.params.id
    let result = await deleteClassroomById(classroomId)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while deleting a classroom", error:error.message})
  }
})

async function getAllStudents() {
  let result = await student.findAll()
  return result  
}

app.get("/students", async (req,res) => {
  try {
    let result = await getAllStudents()
    if(result.length === 0){
      return res.status(404).json({message: "students not found."})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while fetching students", error:error.message})
  }
})

async function addNewStudents(newStudent) {
  let result = await student.create(newStudent)
  return {message: "added successfully", result}
}

app.post("/students", async (req,res) => {
  try {
    let newStudent = req.body
    let result = await addNewStudents(newStudent)
    if(!result){
      return res.status(404).json({message: "No addition"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while adding new students data", error:error.message})
  }
})

async function updateStudentById(studentId, updateValue) {
  let updatedValue = await student.findOne({where: {id: studentId}})
  if(!updatedValue){
    return "No student found"
  }
  updatedValue.set(updateValue)
  let result = await updatedValue.save()
  return {message: "update successfull", result}
}

app.put("/students/:id", async (req,res) => {
  try {
    let studentId = req.params.id
    let updateValue = req.body
    let result = await updateStudentById(studentId, updateValue)
    if(!result){
      return res.status(404).json({message: "no updation"})
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while updating students data", error:error.message})
  }
})

async function deleteStudentById(studentId) {
  let result = await student.destroy({where: {id: studentId}})
  return {message: "deletion successfull"}
}

app.delete("/students/:id", async (req,res) => {
  try {
    let studentId = req.params.id
    let result = await deleteStudentById(studentId)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message: "Error while deleteing student data", error:error.message})
  }
})

app.listen(PORT,() => {
    console.log(`server running on localhost ${PORT}`)
})