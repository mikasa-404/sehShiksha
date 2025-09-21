export const POST_EVENT_TYPES = {
  NEW_POST: 'NEW_POST',
  POST_UPVOTE: 'POST_UPVOTE',
  POST_DOWNVOTE: 'POST_DOWNVOTE',
//   POST_SHARE: 'POST_SHARE',
//   POST_COMMENT: 'POST_COMMENT'
};

export const isValidPostEventType = (eventType) => {
    return Object.values(POST_EVENT_TYPES).includes(eventType);
};
