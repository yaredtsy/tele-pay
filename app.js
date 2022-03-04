const express = require("express");
const cors = require("cors");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.post("/telepay/failed/:id",async(req,res,)=>{
  console.log('reccieved');
  console.log(res.body);
});

app.post("/telepay/success/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const url = `https://us-central1-airtime-payment.cloudfunctions.net/payment/telebirr/paymentsuccess/${id}`;
    console.log(url);

    const body = await new Promise((resolve, reject) => {
      https.get(url, (result) => {
        resolve(result);
        console.log(result.statusCode);
        res.json({ 
            success: "success" 
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

const port = process.env.PORT || 5000;

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
