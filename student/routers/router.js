// This line imports the Router class from the express module, which is used to define routes for an Express app.
import { Router } from "express";
//This line imports the studentController object from the ../controllers/studentController.js module
import studentController from "../controllers/studentController.js";

//This line creates a new Router object.
const router = Router();

//This line defines a route for GET requests to the /get-course endpoint. When a request is received, 
//it calls the asynchronous getCourse() function from the studentController object with the request body as the parameter.
// If the function call is successful, it sends a JSON response containing the course data and a 200 status code.
// If an error occurs, it logs the error to the console and sends a JSON response containing the error message 
//and a 400 status code.
router.get("/get-course", async (req, res) => {
  try {
    const course = await studentController.getCourse(req.body);
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//This line defines a route for GET requests to the /get-all-courses endpoint. When a request is received,
// it calls the asynchronous getAllCourses() function from the studentController object.
// If the function call is successful, it sends a JSON response containing an array of course data 
//and a 200 status code. If an error occurs, it logs the error to the console and sends a JSON response 
//containing the error message and a 400 status code.
router.get("/get-all-courses", async (req, res) => {
  try {
    const courses = await studentController.getAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

export default router;
