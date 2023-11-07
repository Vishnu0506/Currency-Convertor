import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const yourAPIKey = "";
const apiUrl = "https://api.currencyapi.com/v3/latest";

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/convert", async (req, res) => {
  const amt = req.body["Amount"];
  const C1 = req.body["Currency1"];
  const C2 = req.body["Currency2"];
  try {
    const response = await axios.get(
      `${apiUrl}?currencies[]=${C1}&currencies[]=${C2}&apikey=${yourAPIKey}`
    );
    const C11 = response.data.data[C1].value;
    const C22 = response.data.data[C2].value;
    const C33 = (C22 / C11) * amt;
    res.render("index.ejs", {
      total: C33.toFixed(2),
      amount: amt,
      Currency1: C1,
      Currency2: C2,
    });
  } catch (error) {
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is currently function on port ${port}`);
});
