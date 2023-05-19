// This line imports the Express framework as a module, 
// which allows us to create an instance of an Express application
import express from "express";

// This function sets up a Kafka producer that can be used to send messages to a Kafka cluster.
import { kafkaProducer } from "./controllers/kafkaProducer.js";

// This line creates an instance of the Express application,
// which can be used to define routes and middleware.
const app = express();

// This line adds middleware to the Express app that parses incoming JSON payloads. 
// This middleware makes it easy to work with JSON data in our request handlers.
app.use(express.json());

// This line calls the kafkaProducer function that was imported on line 2,
// passing in the app instance. This sets up the Kafka producer and attaches it to 
// the app instance so that it can be used in our request handlers
kafkaProducer(app);

// This line starts the Express server and listens for incoming HTTP requests on the port 
// specified in the process.env.PORT environment variable.
app.listen(process.env.PORT, () => {
  //This line logs a message to the console indicating that the server is running and listening for requests on the specified port.
  console.log("listening on port " + process.env.PORT);
});
