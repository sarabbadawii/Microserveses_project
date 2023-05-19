// This line imports the Course class from the ../models/course.js module.
import { Course } from "../models/course.js";

// This line imports the kafkaSend function from the ./kafkaProducer.js module.
import { kafkaSend } from "./kafkaProducer.js";

// This line defines a function called sendCourse that takes three parameters: res (the response object),
// courseData (an object containing course data), and method (the HTTP method used to send the request).
const sendCourse = (res, courseData, method) => {
  try {
    // This line creates a new Course object using the Course constructor function and the courseData and method parameters.
    const course = new Course(courseData, method);
    // This line sends the course object to the Kafka topic using the kafkaSend function
    kafkaSend(course);
    // This line sends a successful response to the client indicating that the message has been sent to the Kafka topic.
    return res.status(200).json("message sent");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export default { sendCourse };
