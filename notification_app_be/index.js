const express = require("express");
const app = express();

app.use(express.json());


let users = [];
let notifications = [];


app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.json(user);
});


app.post("/notifications", (req, res) => {
  const { userId, message } = req.body;

  const notification = {
    id: notifications.length + 1,
    userId,
    message,
    read: false
  };

  notifications.push(notification);

  res.json(notification);
});


app.get("/users/:id/notifications", (req, res) => {
  const userId = Number(req.params.id);

  const userNotifications = notifications.filter(
    n => n.userId === userId
  );

  res.json(userNotifications);
});


app.put("/notifications/:id/read", (req, res) => {
  const id = Number(req.params.id);

  const notification = notifications.find(n => n.id === id);

  if (!notification) {
    return res.status(404).send("Not found");
  }

  notification.read = true;

  res.json(notification);
});

app.listen(5000, () => {
  console.log("Notification service running on 5000");
});
