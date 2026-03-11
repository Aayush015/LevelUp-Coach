import AppleHealthKit, { HealthInputOptions } from 'react-native-health';
import axios from 'axios';

const API_URL = 'http://174.56.108.204:8000'; // Replace with your actual IP

export const syncHealthData = () => {
  const options: HealthInputOptions = {
    startDate: new Date(2026, 0, 1).toISOString(),
  };

  AppleHealthKit.getSamples(options, (err, results) => {
    if (err) return console.error(err);

    // Map Apple Health format to our Backend format
    const formattedData = results.map(sample => ({
      source: 'apple_health',
      type: 'workout',
      timestamp: sample.startDate,
      duration_min: 30, // Mocking duration for now
      heart_rate_avg: 145, // Mocking HR for now
    }));

    // SEND TO BACKEND
    axios.post(`${API_URL}/sync`, formattedData)
      .then(() => console.log("🚀 Sync Complete!"))
      .catch(e => console.error("❌ Sync Failed", e));
  });
};