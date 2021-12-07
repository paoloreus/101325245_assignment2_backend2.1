let express = require("express")
let mongoose = require("mongoose")
let EmployeeModel = require("./models/Employee")

let app = express();

mongoose.connect('mongodb+srv://paolodb:borussia@cluster0.npw0g.mongodb.net/101325245_assignment2?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

app.get("/", (req, res) => {
    res.send("<h1>List of Employees </h1>")
})

app.get("/add", async (req, res) => {

    let e = {
        firstName: "Leeann",
        lastName: "Shields",
        emailid: "lshields@gmail.com"
    }

    let new_employee = new EmployeeModel(e)

    try {
        await new_employee.save(e)
        res.status(200).send("Employee Saved")
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get("/employees", async (req, res) => {
    const e = await EmployeeModel.find({})
    //const e =  await EmployeeModel.find({}, "firstName")
    try{
        res.send(e)
    }catch(err){
        res.status(500).send(err)
    }
})

app.post('/employee', async (req, res) => {
    const employee = new EmployeeModel(req.body);
    try{
        await employee.save();
        res.send(employee);
    } catch(err){
        res.status(500).send(err);
    }
});

app.patch('/employee/:id', async (req, res) => {
    try{
        await EmployeeModel.findByIdAndUpdate(req.params.id, req.body)
        let employee = await EmployeeModel.save()
        res.status(200).send("Employee updated")
    } catch(err) {
        //res.status(500).send(err)
        console.log("Error: " + err)
    }
})

app.put('/employee/:id', async(req, res) => {
    try {
        await EmployeeModel.findByIdAndUpdate(req.params.id, req.body)
        let employee = await EmployeeModel.save()
        res.status(200).send("Put Request implemented on Employee")
    } catch(err) {
        res.status(500).send(err)
    }
})

app.delete('/employee/:id', async(req, res) => {
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id)
        if(!employee) res.status(404).send("No Employee found")
        res.status(200).send("Employee Deleted")
    } catch(err){
        res.status(500).send(err)
    }
})

app.listen(8089, () => {
    console.log("Server is up and running on 8089")
})

