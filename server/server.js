const express = require("express");
const bodyParser = require("body-parser");
const bfhlRoute = require("./routes/bfhl");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  
app.use(bodyParser.json());

app.use("/", bfhlRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// {
//   "data": ["M", "1", "334", "4", "B", "Z", "a", "7"],
//   "file_b64": "BASE_64_STRING"
// }
