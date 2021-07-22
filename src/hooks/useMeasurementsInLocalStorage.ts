import { Measurement } from "types";
import { useState } from "react";

export const useMeasurementsInLocalStorage = () => {
    // State to store our value
    const [measurements, setMeasurements] = useState<Array<Measurement>>(() => {
      try {
        const items = window.localStorage.getItem('measurements');
        
        return items ? JSON.parse(items) : [];
      } catch (error) {
        console.error(error);
        return [];
      }
    });
    
    const addMeasurement = (value: Measurement | Function) => {
      try {
        const valueToStore =
          value instanceof Function ? value(measurements) : value;
    
        valueToStore.createdAt = Date.now();
        setMeasurements([...measurements, valueToStore]);
        window.localStorage.setItem('measurements', JSON.stringify([...measurements, valueToStore]));
      } catch (error) {
        console.error(error);
      }
    };

    const removeMeasurements = (measurementsToRemove: Array<Measurement>) => {
      try {
          const measurementsToRemoveIdsSet = new Set(measurementsToRemove.map(({id}) => id));
          const updatedMeasurements = measurements.filter(({id}) => !measurementsToRemoveIdsSet.has(id));

          setMeasurements([...updatedMeasurements]);
          if (updatedMeasurements.length)
              window.localStorage.setItem('measurements', JSON.stringify([...updatedMeasurements]));
          else 
              window.localStorage.removeItem('measurements');
      } catch (error) {
          console.error(error);
      }
  };

    return {measurements, addMeasurement, removeMeasurements};
  }
  