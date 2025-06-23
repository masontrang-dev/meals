const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const mealsRoutes = require("./routes/mealsRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/meals", mealsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
