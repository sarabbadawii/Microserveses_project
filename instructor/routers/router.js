// This line imports the Router class from the express module.
// Router is used to create a new router object that can handle HTTP requests.
import { Router } from "express";

// This line imports the instructorController module that handles the logic for adding and deleting courses.
import instructorController from "../controllers/instructorController.js";

// This line creates a new router object by calling the Router constructor
const router = Router();

// This line defines a route for adding a course using the POST HTTP method. 
// The first argument is the path of the route, which is "/add-course". 
// The second argument is a callback function that takes two arguments:
// req (the request object) and res (the response object). 
// The callback function calls a method in the instructorController module to handle the logic for adding a course.
router.post("/add-course", (req, res) => {
  return instructorController.sendCourse(res, req.body, "add");
});

// This line defines a route for deleting a course using the DELETE HTTP method.
// The first argument is the path of the route, which is "/delete-course".
// The second argument is a callback function that takes two arguments:
// req (the request object) and res (the response object). 
// The callback function calls a method in the instructorController module to handle the logic for deleting a course
router.delete("/delete-course", (req, res) => {
  return instructorController.sendCourse(res, req.body, "delete");
});

// This line exports the router object as the default export of this module,
// so that it can be imported and used by other modules in the application.
export default router;
