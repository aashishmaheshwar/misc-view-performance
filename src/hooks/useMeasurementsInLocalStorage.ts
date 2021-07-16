import { Measurement } from "pages/DataViews/DataViews";
import { useState } from "react";

// Hook
export const useMeasurementsInLocalStorage = () => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [measurements, setMeasurements] = useState(() => {
      try {
        // Get from local storage by key
        const items = window.localStorage.getItem('measurements');
        // Parse stored json or if none return empty array
        return items ? JSON.parse(items) : [];
      } catch (error) {
        // If error also return empty array
        console.log(error);
        return [];
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const addMeasurement = (value: Measurement) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(measurements) : value;
        valueToStore.createdAt = Date.now();
        // Save state
        setMeasurements([...measurements, valueToStore]);
        // Save to local storage
        window.localStorage.setItem('measurements', JSON.stringify([...measurements, valueToStore]));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };

    return {measurements, addMeasurement};
  }
  