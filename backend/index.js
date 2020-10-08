const express = require("express");
const cors = require("cors");
const SECRET_KEY = "";
const stripe = require("stripe")(SECRET_KEY);

//App config
const app = express();
const origin = {
  origin: "https://clone-a6d36.web.app",
  optionsSuccessStatus: 200,
};
//Middlewares
app.use(cors(origin));
app.use(express.json());

//API routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log(`Payment received ${total}`);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
