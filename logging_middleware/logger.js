const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2azQ1MjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzY5OTAwNSwiaWF0IjoxNzc3Njk4MTA1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGY4ODE4NDktMjkyYS00MTE3LTlhZDUtNzdlM2E1ZDYzMTZjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmljdG9yIGRldmFuYW5kIGtvbmdhbGEiLCJzdWIiOiI0NGE4MzAwNS03MjM0LTQ3MDgtYTExYS03YmEzM2Q0OTFiMWUifSwiZW1haWwiOiJ2azQ1MjdAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ2aWN0b3IgZGV2YW5hbmQga29uZ2FsYSIsInJvbGxObyI6InJhMjMxMTAwNDA1MDAyOSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjQ0YTgzMDA1LTcyMzQtNDcwOC1hMTFhLTdiYTMzZDQ5MWIxZSIsImNsaWVudFNlY3JldCI6InhSVk1Td1RVTnhoTlFXdVUifQ.gvDHQqIRe3_gkSkKSXRzlOTJnwJd7wX21bsENbxOT64";

async function Log(stack, level, pkg, message) {
  try {
    const res = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Log success:", res.data);
  } catch (err) {
    console.log("Log error:", err.response?.data || err.message);
  }
}

module.exports = Log;