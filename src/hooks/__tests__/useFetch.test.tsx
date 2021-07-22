import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from "../useFetch";

const SampleMeasurements = [
  {
    id: "B7hPaMO5n7b7WUi0ZI2-y",
    type: "tiles",
    phase: "update",
    actualDuration: 0.20000004768371582,
    baseDuration: 0.20000004768371582,
    fetchDuration: 213,
    interactions: new Set(),
    startTime: 47123,
    commitTime: 47124,
    createdAt: 1626791796198,
  },
  {
    id: "B7hPaMO5n7b7WUi0ZI4-y",
    type: "tiles",
    phase: "update",
    actualDuration: 0.20000004768371584,
    baseDuration: 0.20200004768371582,
    fetchDuration: 203,
    interactions: new Set(),
    startTime: 45123,
    commitTime: 45124,
    createdAt: 1626791756198,
  },
];

describe("useFetch", () => {
  it(`returns the response if fetch is successfull`, async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(SampleMeasurements),
      })
    ) as any;
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useFetch()
    );
    await waitForNextUpdate();
    rerender();
    const { response, error } = result.current;
    expect(response).toEqual(SampleMeasurements);
    expect(error).toBeNull();
  });

  it(`response is null and error obj is non-null if fetch is unsuccessfull`, async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject({ message: "Fetch failed" }),
      })
    ) as any;
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useFetch()
    );
    await waitForNextUpdate();
    rerender();
    const { response, error } = result.current;
    expect(error).toEqual({ message: "Fetch failed" });
    expect(response).toBeNull();
  });
});

export {};
