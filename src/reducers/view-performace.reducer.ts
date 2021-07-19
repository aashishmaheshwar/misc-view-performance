import { isEqual, filter } from "lodash";

const InitialState = {
  selectedMeasurements: []
};

const performanceReducer = (state = InitialState, action: { type: string; payload: any }) => {
    switch (action.type) {
      case "EMIT_FETCH_DURATION": {
        return {
          ...state,
          fetchDuration: action.payload,
        };
      }
      case "ASSIGN_MEASUREMENTS": {
        return {
          ...state,
          selectedMeasurements: action.payload
        };
      }
      case "ADD_MEASUREMENT": {
          return {
            ...state,
            selectedMeasurements: [...state.selectedMeasurements, action.payload]
          };
      }
      case "REMOVE_MEASUREMENT": {
        return {
          ...state,
          selectedMeasurements: filter(state.selectedMeasurements, 
            (measurement => !isEqual(action.payload, measurement)))
        };
      }
      default:
        return state;
    }
  };
  
  export default performanceReducer;
  