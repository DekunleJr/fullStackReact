const express = require("express");
require("dotenv").config();
require("./services/passport"); // Ensure this is imported to initialize passport strategies

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
