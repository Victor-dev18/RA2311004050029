const express = require("express");
const axios = require("axios");
const knapsack = require("./scheduler");
const Log = require("../logging_middleware/logger");

const app = express();
app.use(express.json());

const BASE_URL = "http://20.207.122.201/evaluation-service";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2azQ1MjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzI5MCwiaWF0IjoxNzc3NzAyMzkwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiM2Y3MTAzNzQtYjdhNy00YmZhLTlhODEtYjBhNTI2NDg0OWNhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmljdG9yIGRldmFuYW5kIGtvbmdhbGEiLCJzdWIiOiI0NGE4MzAwNS03MjM0LTQ3MDgtYTExYS03YmEzM2Q0OTFiMWUifSwiZW1haWwiOiJ2azQ1MjdAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ2aWN0b3IgZGV2YW5hbmQga29uZ2FsYSIsInJvbGxObyI6InJhMjMxMTAwNDA1MDAyOSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjQ0YTgzMDA1LTcyMzQtNDcwOC1hMTFhLTdiYTMzZDQ5MWIxZSIsImNsaWVudFNlY3JldCI6InhSVk1Td1RVTnhoTlFXdVUifQ.2Cd9u7zTxLJJWfGCQvuEVxuFYDZXyAGFIbu752HFtk0";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json"
};

function extractArray(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    for (let key in data) {
      if (Array.isArray(data[key])) return data[key];
    }
  }
  return [];
}

app.get("/schedule", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Schedule API called");

    const depotRes = await axios.get(`${BASE_URL}/depots`, { headers });
    const depots = extractArray(depotRes.data);

    const results = [];

    for (let depot of depots) {

      const depotId = depot.depotId || depot.id;

      const maxHours = Number(
        depot.mechanicHours ||
        depot.mechanic_hours ||
        depot.totalMechanicHours ||
        depot.total_mechanic_hours ||
        0
      );

      if (!depotId || !maxHours) continue;

      await Log("backend", "info", "service", `Processing depot ${depotId}`);

     
      const vehicleRes = await axios.get(
        `${BASE_URL}/vehicles?depotId=${depotId}`,
        { headers }
      );

      const vehicles = extractArray(vehicleRes.data);

      console.log(`Depot ${depotId} → Vehicles:`, vehicles.length);

      const cleanTasks = vehicles.map(v => ({
        TaskID: v.TaskID,
        Duration: Number(v.Duration),
        Impact: Number(v.Impact)
      })).filter(t => t.Duration > 0 && t.Impact > 0);

      const selected = knapsack(cleanTasks, maxHours);

      results.push({
        depotId,
        totalHours: maxHours,
        selectedTasks: selected
      });
    }

    await Log("backend", "info", "controller", "Scheduling completed");

    res.json({
      success: true,
      results
    });

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    await Log("backend", "error", "handler", err.message);

    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
});

app.listen(4000, () => {
  console.log("Scheduler running on port 4000");
});
