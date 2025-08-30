const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = {}; // simple in-memory storage

// ইউজার ad দেখলে backend এ রেকর্ড হবে
app.post("/api/addView", (req, res) => {
  const { telegram_id } = req.body;
  if (!users[telegram_id]) {
    users[telegram_id] = { ads_seen: 0, balance: 0 };
  }

  users[telegram_id].ads_seen++;

  // প্রতি 10 টা অ্যাডে 1 টাকা যোগ হবে
  if (users[telegram_id].ads_seen % 10 === 0) {
    users[telegram_id].balance += 1;
  }

  res.json({ success: true, data: users[telegram_id] });
});

// Admin Panel - সব ইউজারের ডেটা দেখার জন্য
app.get("/api/admin", (req, res) => {
  res.json(users);
});

// Render PORT ব্যবহার করবে, না হলে 3000 এ চলবে
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
