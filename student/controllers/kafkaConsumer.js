// This line imports the KafkaClient and Consumer classes from the kafka-node package,
// which provides a high-level API for working with Apache Kafka in Node.js.
import { KafkaClient, Consumer } from "kafka-node";
//This line imports the studentController object from the ./studentController.js module
import studentController from "./studentController.js";

//This line exports a function called kafkaConsumer as a named export. The function creates a Kafka consumer 
//that listens for messages on a Kafka topic and calls functions from the studentController object 
//to add or delete course data in a database.
export const kafkaConsumer = () => {
  //This line creates a new KafkaClient object using the Kafka bootstrap servers specified in the KAFKA_BOOTSTRAP_SERVERS environment variable.
  const client = new KafkaClient({
    kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
  });

  //This line creates a new Consumer object using the KafkaClient object and the Kafka topic specified in 
  //the KAFKA_TOPIC environment variable. The autoCommit option is set to false, 
  //which means that the consumer will not automatically commit offsets when it receives messages.
  const consumer = new Consumer(client, [{ topic: process.env.KAFKA_TOPIC }], {
    autoCommit: false,
  });
  

  //This line sets up an event listener for the message event, which is emitted when a new message is received
  // on the Kafka topic. When a message is received, the function parses the message data as JSON
  // and logs it to the console. It then checks the method field of the message data to determine whether 
  //to call the addCourse() or deleteCourse() function from the studentController object.
  consumer.on("message", async (message) => {
    const courseData = JSON.parse(message.value);
    console.log(courseData);
    if (courseData.method === "add") studentController.addCourse(courseData);
    else if (courseData.method === "delete")
      studentController.deleteCourse(courseData);
  });

  consumer.on("error", (err) => {
    console.log(err);
  });
};

//In summary, this file exports a function that creates a Kafka consumer that listens for messages on a Kafka topic 
//and calls functions from the studentController object to add or delete course data in a database.
// When a new message is received, the consumer parses the message data as JSON, logs it to the console,
// and calls the appropriate function from the studentController object based on the method field of the message data.
// If an error occurs while consuming messages, the error is logged to the console.
