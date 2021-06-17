const express = require("express")
const router = express.Router()
const studentModel = require("../model/students")
const debug = require("../middlewares/debug")

router.get("/", debug, async (req, res) => {
    try {
        const students = await studentModel.find().exec()

        res.json(students)
    } catch (error) {
        console.error("Error in GET /students", error)

        res.json({
            message: "Error when finding students :("
        }, 500)
    }
})

router.post("/", debug, async (req, res) => {
    try {
        const newStudent = req.body

        const student = new studentModel({
            name: newStudent.name,
            age: newStudent.age
        })

        const studentSaved = await student.save()

        res.json({
            message: "The student was saved correctly",
            newStudent
        })

    } catch (error) {
        console.error("Error in POST /students", error)

        res.json({
            message: "The student was not saved :("
        })
    }

})

router.all("*", (req, res) => {
    res.json({
        message: "The route doesn't exist"
    })
})

module.exports = router