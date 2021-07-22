import { useMeasurementsInLocalStorage } from "hooks/useMeasurementsInLocalStorage";
import { mockLocalStorage } from "test-utils";
import { act, renderHook } from "@testing-library/react-hooks";
import { Measurement } from "types";

const { getItemMock, setItemMock, removeItemMock } = mockLocalStorage();

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

describe(`useMeasurementsInLocalStorage`, () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it(`trying to access measurements in localstorage if it is not present returns []`, () => {
    getItemMock.mockReturnValue(null);
    const { result } = renderHook(() => useMeasurementsInLocalStorage());
    expect(result.current.measurements).toEqual([]);
    expect(getItemMock).toHaveBeenCalledWith("measurements");
    getItemMock.mockReturnValue("abc");
  });

  it(`trying to access measurements in localstorage if it is 'not array' returns []`, () => {
    getItemMock.mockReturnValue("abc");
    const { result } = renderHook(() => useMeasurementsInLocalStorage());
    expect(result.current.measurements).toEqual([]);
    expect(getItemMock).toHaveBeenCalledWith("measurements");
  });

  describe("addMeasurement", () => {
    it(`added meaurement must be set in localstorage`, () => {
      setItemMock.mockReturnValue(null);
      const { result } = renderHook(() => useMeasurementsInLocalStorage());
      act(() =>
        result.current.addMeasurement({
          id: "B7hPaMO5n7b7WUi0ZI2-y",
          type: "tiles",
          phase: "update",
          actualDuration: 0.20000004768371582,
          baseDuration: 0.20000004768371582,
          fetchDuration: 213,
          interactions: new Set(),
          startTime: 47123,
          commitTime: 47124,
        })
      );
      expect(setItemMock).toHaveBeenCalledWith(
        "measurements",
        expect.stringContaining("0.20000004768371582")
      );
    });

    it(`if value as a callback function throws error, it logs the error`, () => {
      setItemMock.mockReturnValue(null);
      const { result } = renderHook(() => useMeasurementsInLocalStorage());
      act(() =>
        result.current.addMeasurement(() => {
          throw new Error("error");
        })
      );
      expect(setItemMock).not.toHaveBeenCalledWith(
        "measurements",
        expect.anything()
      );
      expect(console.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "error",
        })
      );
    });
  });

  describe("removeMeasurements", () => {
    it(`removing all measurements removes 'measurements' from localstorage`, () => {
      getItemMock.mockReturnValue(JSON.stringify(SampleMeasurements));
      removeItemMock.mockReturnValue([]);
      const { result } = renderHook(() => useMeasurementsInLocalStorage());
      act(() =>
        result.current.removeMeasurements(
          SampleMeasurements as Array<Measurement>
        )
      );
      expect(removeItemMock).toHaveBeenCalledWith("measurements");
    });

    it(`removing some measurements retains thee other measurements in 'measurements' in localstorage`, () => {
      getItemMock.mockReturnValue(JSON.stringify(SampleMeasurements));
      setItemMock.mockReturnValue([]);
      const { result } = renderHook(() => useMeasurementsInLocalStorage());
      act(() =>
        result.current.removeMeasurements([
          SampleMeasurements[0],
        ] as Array<Measurement>)
      );
      expect(setItemMock).toHaveBeenCalledWith(
        "measurements",
        expect.stringContaining("B7hPaMO5n7b7WUi0ZI4-y")
      );
    });
  });
});
