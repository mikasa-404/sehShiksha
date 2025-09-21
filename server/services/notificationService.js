import Post from '../models/Posts.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import { publishMessage } from './aws/snsService.js';
import { isValidPostEventType } from '../constants/eventTypes.js';

class NotificationService {
  async handlePostEvent(postId, userId, eventType, metaData) {
    try {
      // Valid event types: POST_EVENT_TYPES.NEW_POST, POST_EVENT_TYPES.POST_UPVOTE, POST_EVENT_TYPES.POST_DOWNVOTE
      if (!isValidPostEventType(eventType)) {
        throw new Error(`Invalid event type: ${eventType}`);
      }
      const notificationData = await this.createPostNotificationMessage(eventType, postId, userId);
      await publishMessage(notificationData, eventType);

    } catch (error) {
      console.error(`Error handling post event: ${error.message}`);
      throw error;
    }
  }

  async createPostNotificationMessage(eventType, postId, userId) {
    try {

      const post = await Post.findById(postId).populate('userId', 'firstName lastName email');
      const sourceUser = await User.findById(userId); //user from who notification came from

      if (!post) {
        throw new Error(`Post not found: ${postId}`);
      }
      if (!sourceUser) {
        throw new Error(`User not found: ${userId}`);
      }

      const eventId = uuidv4();
      const notificationData = {
        eventId: eventId,
        postId: postId,
        eventType: eventType,
        source: {
          userId: userId,
          firstName: sourceUser?.firstName,
          lastName: sourceUser?.lastName,
          email: sourceUser?.email,
        },
        target: {
          userIds: [],
          excludeIds: [],
        },
        message: '',
        redirectUrl: `/post/${postId}`,
        timestamp: new Date().toISOString(),
      }

      switch (eventType) {
        case 'NEW_POST':
          notificationData.message = `${sourceUser?.firstName} ${sourceUser?.lastName} shared a new post: "${post?.description?.substring(0, 50)}..."`
          notificationData.target.userIds = [];//all users 
          notificationData.target.excludeIds = [userId]; // Don't notify the post creator
          break;
      }

      return notificationData;
    } catch (error) {
      console.error(`Error creating post notification message: ${error.message}`);
      throw error;
    }
  }
}

export default new NotificationService();