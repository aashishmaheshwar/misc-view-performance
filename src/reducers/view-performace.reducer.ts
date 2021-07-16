const performanceReducer = (state = {}, action: { type: string; payload: any }) => {
    switch (action.type) {
      case "EMIT_FETCH_DURATION": {
        return {
          ...state,
          fetchDuration: action.payload,
        };
      }
      case "CLEAR_MEASUREMENT": {
        return {};
      }
      default:
        return state;
    }
  };
  
  export default performanceReducer;
  