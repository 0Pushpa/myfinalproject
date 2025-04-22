const initialData = {
  messages: [],
  groupMessages: {},
};
export const chatReducers = (state = initialData, action) => {
  switch (action.type) {
    case "GET_MESSAGES":
      console.log("📦 Payload received:", action.payload);
      const groupId = action.payload[0]?.groupId;
    
      const uniquePayload = action.payload.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.message === value.message &&
              t.sent_at === value.sent_at &&
              t.uid === value.uid
          )
      );
    
      const existingMessages = state.groupMessages[groupId] || [];
    
      const combined = [...existingMessages, ...uniquePayload];
    
      const deduplicated = combined.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.message === value.message &&
              t.sent_at === value.sent_at &&
              t.uid === value.uid
          )
      );
    
      return {
        ...state,
        messages: uniquePayload,
        groupMessages: {
          ...state.groupMessages,
          [groupId]: deduplicated,
        },
      };
    
    case "SEND_MESSAGE":
      const unfilteredAll = [...state.messages, action.payload];
      const filteredAll = unfilteredAll.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.message === value.message &&
              t.sent_at === value.sent_at &&
              t.uid === value.uid
          )
      );
      const groupMessages = state.groupMessages;
      if (groupMessages[action.payload.groupId]) {
        groupMessages[action.payload.groupId].push(action.payload);
      } else {
        groupMessages[action.payload.groupId] = [action.payload];
      }

      //to remove duplicate messages if exists
      const unfiltered = groupMessages[action.payload.groupId];
      const filtered = unfiltered.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.message === value.message &&
              t.sent_at === value.sent_at &&
              t.uid === value.uid
          )
      );
      groupMessages[action.payload.groupId] = filtered;
      state = {
        messages: filteredAll,
        groupMessages: groupMessages,
      };
      return state;
    case "AVAILABLE_PARTICIPANTS":
      state = {
        ...state,
        details: {
          participants: action.payload,
        },
      };
      return state;
    case "CHAT_ERROR":
      state = {
        messages: [],
      };
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
