// This code defines a database schema for courses using Sequelize, 
// and exports several functions for manipulating the course data in the database. Here's a step-by-step explanation:

// This line imports the sequelize module, which is an ORM (Object-Relational Mapping) for Node.js that provides
// an easy-to-use interface between JavaScript and relational databases.
import sequelize from "sequelize";
//This line imports the Course class from the ../models/course.js module.
import { Course } from "../models/course.js";

//This line creates a new Sequelize instance using the PostgreSQL database URL 
//specified in the POSTGRES_URL environment variable.
const db = new sequelize(process.env.POSTGRES_URL);

//This line sets up a logging function for the Sequelize instance. 
//If the message starts with "Executing", it is ignored. Otherwise, it is logged to the console.
db.options.logging = (message) => {
  if (message.startsWith("Executing")) {
    // Do nothing
  } else {
    console.log(message);
  }
};

//This line defines a Sequelize model called CourseDB that maps to the course table in the database.
// The model has two columns: id (an integer column that is the primary key) and name (a string column).
const CourseDB = db.define("course", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: sequelize.STRING,
});

// This line synchronizes the Sequelize model with the database, creating the course table if it doesn't exist.
// The force: true option drops the existing tables and recreates them,
// which can be useful during development but should be avoided in production.

db.sync({ force: true });

//This line defines an asynchronous function called addCourse that takes courseData as a parameter. 
//It creates a new Course object using the Course constructor function and the courseData parameter. 
//It then checks if a course with the same id already exists in the database using the findByPk() method. 
//If not, it creates a new course record in the database using the create() method and logs a success message.
// If a course with the same id already exists, it logs a message indicating that the course already exists.
const addCourse = async (courseData) => {
  try {
    const course = new Course(courseData);
    const result = await CourseDB.findByPk(course.id);
    if (!result) {
      await CourseDB.create({
        id: course.id,
        name: course.name,
      });
      console.log("Course added successfully");
    } else console.log("Course Id Already Exist");
  } catch (err) {
    console.log(err);
  }
};

//This line defines an asynchronous function called deleteCourse that takes courseData as a parameter. 
//It checks if a course with the specified id exists in the database using the findByPk() method. 
//If it exists, it deletes the course using the destroy() method and logs a success message.
// If it doesn't exist, it logs a message indicating that the course was not found.
const deleteCourse = async (courseData) => {
  try {
    const result = await CourseDB.findByPk(courseData.id);
    if (result) {
      await CourseDB.destroy({
        where: {
          id: courseData.id,
        },
      });
      console.log("Course deleted!");
    } else console.log("Course not found!");
  } catch (err) {
    console.log(err);
  }
};

// This line defines an asynchronous function called getCourse that takes courseData as a parameter.
// It finds a course with the specified id using the findByPk() method and returns it.
const getCourse = async (courseData) => {
  return CourseDB.findByPk(courseData.id);
};

// This line defines an asynchronous function called getAllCourses that returns all courses
// in the database using the findAll() method.
const getAllCourses = async () => {
  return CourseDB.findAll();
};

// This line exports an object containing the addCourse, deleteCourse, getCourse, and getAllCourses functions 
// so that they can be used in other modules.
export default { addCourse, deleteCourse, getCourse, getAllCourses };
