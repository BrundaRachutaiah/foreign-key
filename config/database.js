const sq = require("sequelize")
const sequelize = new sq.Sequelize({
    dialect: 'sqlite',
    storage: 'Database/student.sqlite'
})

module.exports = {DataTypes: sq.DataTypes, sequelize}