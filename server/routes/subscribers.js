require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Subscriber = require("../models/subscriber");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Getting all

router.get("/", authenticateToken, async (req, res) => {
  //   res.send("hello world");

  try {
    const subscriber = await Subscriber.find();
    console.log(subscriber);
    res.send(subscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting One
router.get("/:id", getSubscriber, async (req, res) => {
  res.json(res.subscriber);
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const findSubscriber = await Subscriber.findOne({
      email: req.body.email,
    });

    if (findSubscriber === null) {
      return res.json({ message: "Email wasn't found" });
    }
    const unhashPass = await bcrypt.compare(
      req.body.password,
      findSubscriber.password
    );

    if (!unhashPass) {
      return res.json({ message: "Password incorrect. Try again" });
    } else {
      /// JSON WEB TOKEN LOGIN

      const accessToken = await jwt.sign(
        { email: findSubscriber.email },
        `${process.env.ACCESS_TOKEN_SECRET}`
      );
      console.log(accessToken);
      res.json(findSubscriber);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Creating one
router.post("/subscribe", async (req, res) => {
  const data = await bcrypt.hash(req.body.password, saltRounds);

  const findSubscriber = await Subscriber.findOne({
    email: req.body.email,
  });

  try {
    if (findSubscriber === null) {
      const subscriber = new Subscriber({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: data,
      });
      const newSubscriber = await subscriber.save();
      return res.status(201).json(newSubscriber);
    } else {
      return res.json({ message: "This email was already used" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Posting Comments
router.patch("/comments/:id", getSubscriber, async (req, res) => {
  if (req.body.comments != null) {
    res.subscriber.comments.push(req.body.comments);
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updating one
router.patch("/:id", getSubscriber, async (req, res) => {
  const { id } = req.params;
  if (req.body.firstName != null) {
    res.subscriber.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.subscriber.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.subscriber.email = req.body.email;
  }
  if (req.body.password != null) {
    const data = await bcrypt.hash(req.body.password, saltRounds);
    res.subscriber.password = data;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

///// MIDDLEWARES

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);
    console.log(user);
    //req.email = email;
    next();
  });
}

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);

    if (subscriber === null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}
module.exports = router;
