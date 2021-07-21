import performanceReducer from "reducers/view-performace.reducer";

describe("Performance Reducer", () => {
  it(`emit fetch duration action returns state with fetchDuration`, () => {
    const dummyState = {
      selectedMeasurements: [],
    };
    const newState = performanceReducer(dummyState, {
      type: "EMIT_FETCH_DURATION",
      payload: 400,
    });
    expect((newState as any).fetchDuration).toBe(400);
  });

  it(`ASSIGN_MEASUREMENTS replaces selectedMeasurements with the payload`, () => {
    const dummyState = {
      selectedMeasurements: [1],
    };
    const newState = performanceReducer(dummyState as any, {
      type: "ASSIGN_MEASUREMENTS",
      payload: ["a", "b"],
    });
    expect((newState as any).selectedMeasurements).toEqual(["a", "b"]);
  });

  it(`ADD_MEASUREMENT appends selectedMeasurements with the payload`, () => {
    const dummyState = {
      selectedMeasurements: [1],
    };
    const newState = performanceReducer(dummyState as any, {
      type: "ADD_MEASUREMENT",
      payload: "a",
    });
    expect((newState as any).selectedMeasurements).toEqual([1, "a"]);
  });

  it(`REMOVE_MEASUREMENT appends selectedMeasurements with the payload`, () => {
    const dummyState = {
      selectedMeasurements: [1, "a", "1"],
    };
    const newState = performanceReducer(dummyState as any, {
      type: "REMOVE_MEASUREMENT",
      payload: "a",
    });
    expect((newState as any).selectedMeasurements).toEqual([1, "1"]);
  });

  it(`incorrect action type makes no change to the state`, () => {
    const dummyState = {
      selectedMeasurements: [1, "a", "1"],
    };
    const newState = performanceReducer(dummyState as any, {
      type: "RANDOM_MEASUREMENT",
      payload: "a",
    });
    expect((newState as any).selectedMeasurements).toEqual([1, "a", "1"]);
  });
});
