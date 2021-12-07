let mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailid: String
})

const Employee = mongoose.model("employee", EmployeeSchema)
module.exports = Employee
