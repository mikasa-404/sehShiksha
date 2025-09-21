import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./config.js";
import { NOTIFICATION_TOPIC_ARN } from "./config.js";


// TODO: Implement SNS service functions
// Example functions that will be implemented:
// - createTopic()
// - subscribe()
// - unsubscribe()

//eventData will have postId and userId and other data
export const publishMessage = async (eventData, eventType) => {
  try {
    const params = {
      TopicArn: NOTIFICATION_TOPIC_ARN,
      Message: JSON.stringify(eventData),
      Subject: `SehShiksha: ${eventType}`,
      // MessageAttributes: {
      //   eventType: {
      //     DataType: "String",
      //     StringValue: eventType,
      //   },
      //   postId: {
      //     DataType: 'String',
      //     StringValue: eventData.postId || 'unknown'
      //   },
      //   userId: {
      //     DataType: 'String',
      //     StringValue: eventData.userId || 'unknown'
      //   }
      // },
    };
    const command = new PublishCommand(params);
    const result = await snsClient.send(command);
    console.log(`Published notification event: ${eventType}`, {
      messageId: result.MessageId,
    });
    return result;
  } catch (error) {
    console.error(`Failed to publish message: ${error.message}`);
    throw error;
  }
};

export const createTopic = async (topicName) => {

};
