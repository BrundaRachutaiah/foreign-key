let {DataTypes, sequelize} = require("../config/database")
const teacher = require("./teacher")
let classroom = sequelize.define('classroom', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teacherId: {
        type: DataTypes.INTEGER
    }
})

classroom.belongsTo(teacher, { foreignKey: "teacherId" });
teacher.hasMany(classroom, { foreignKey: "teacherId" });

module.exports = classroom