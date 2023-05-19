// This line imports the router object from the ../routers/router.js module.
import router from "../routers/router.js";

// This line imports the KafkaClient and Producer classes from the kafka-node module
import { KafkaClient, Producer } from "kafka-node";



// This line creates a new KafkaClient object with the bootstrap servers set to the URL specified 
// in the KAFKA_BOOTSTRAP_SERVERS environment variable.
const client = new KafkaClient({
  kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
});



// This line creates a new Producer object using the client object created in the previous step.
const producer = new Producer(client);



// This line exports an async function called kafkaProducer that takes one parameter:
// app. This function is used to set up the Kafka producer and start the Express app.
export const kafkaProducer = async (app) => {
  // This line sets up a listener for the ready event on the producer object.
  // When the producer is ready, this callback function is called
  producer.on("ready", async () => {
    //This line logs a message to the console indicating that the producer is ready
    console.log("producer ready");
    //This line sends a message to the Kafka topic.
    kafkaSend({ message: "topic created" });
    //This line adds the router object to the Express app to handle incoming HTTP requests.
    app.use(router);
  });
};


//This line exports a function called kafkaSend that takes one parameter: message.
// This function is used to send messages to the Kafka topic.
export function kafkaSend(message) {
  // This line sends a message to the Kafka topic. The message is an array of objects, 
  // with each object representing a message to be sent.
  // The topic property of each object specifies the name of the Kafka topic,
  // and the messages property contains the message to be sent. In this case, 
  // the message object passed as a parameter to the kafkaSend function is stringified and sent as the message.
  // The callback function is called when the message has been sent, and logs any errors that occur
  producer.send(
    [
      {
        topic: process.env.KAFKA_TOPIC,
        messages: JSON.stringify(message),
      },
    ],
    (err, data) => {
      if (err) console.log(err);
    }
    );
  }
  
//JSON.stringify(message) is a method in JavaScript that converts a JavaScript object into a JSON string.
// In this code, the message object passed as a parameter to the kafkaSend function is being converted to a JSON string 
//using JSON.stringify().

//This is necessary because Kafka messages can only be sent as strings or byte arrays. 
//Therefore, any data that needs to be sent as a message to Kafka must be converted to a string or a byte array.
// In this case, the message object is being sent as a string by converting it to a JSON string using JSON.stringify().

//Once the message object has been converted to a JSON string, 
//it is added to an array of messages to be sent to the Kafka topic. 
//This array is passed as the first argument to the producer.send() method.
// The messages property of each object in the array contains the JSON string representing the message to be sent.

//So in summary, messages: JSON.stringify(message) is adding a stringified version of the message object as a message 
//to the array of messages to be sent to the Kafka topic.

