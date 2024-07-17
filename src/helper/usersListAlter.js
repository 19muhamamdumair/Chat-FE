const modifiedListTherapist = (therapists, conversations) => {
  const therapistMap = therapists.reduce((map, therapist) => {
    map[therapist.user_id] = therapist;
    return map;
  }, {});

  const enhancedConversations = conversations.map((session) => {
    const therapist = therapistMap[conversations.therapist];
    return {
      ...session,
      username: therapist && therapist.username ? therapist.username : null,
    };
  });
  return enhancedConversations;
};

export default modifiedListTherapist;
