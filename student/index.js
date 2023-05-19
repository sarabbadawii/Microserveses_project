// This line imports the Express framework as a module, 
// which allows us to create an instance of an Express application
import express from "express";

// The second line imports a kafkaConsumer function from a file called kafkaConsumer.js.
// This function is defined elsewhere in the codebase and is responsible for consuming messages from a Kafka topic
import { kafkaConsumer } from "./controllers/kafkaConsumer.js";
import router from "./routers/router.js";

// This line creates an instance of the Express application,
// which can be used to define routes and middleware.
const app = express();

// This line adds middleware to the Express app that parses incoming JSON payloads. 
// This middleware makes it easy to work with JSON data in our request handlers.
app.use(express.json());

const wait = () => {
  kafkaConsumer();
};

setTimeout(wait, 5000);

app.use(router);

//// This line starts the Express server and listens for incoming HTTP requests on the port 
// specified in the process.env.PORT environment variable.
app.listen(process.env.PORT, () => {
   //This line logs a message to the console indicating that the server is running and listening for requests on the specified port.
  console.log("listening on port " + process.env.PORT);
});
