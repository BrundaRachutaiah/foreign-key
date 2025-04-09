let {DataTypes, sequelize} = require("../config/database")
const classroom = require("./classroom")
let student = sequelize.define('student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    classroomId: {
        type: DataTypes.NUMBER,
    }
})

student.belongsTo(classroom, {foreignKey: 'classroomId'})
classroom.hasMany(student, {foreignKey: 'classroomId'})

module.exports = student