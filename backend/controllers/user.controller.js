const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const { usersModel } = require("../models/user.model");

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClientParams = {};

exports.getUser = async (req, res, next) => {
    res.status(200).json({
        "users": "You got some Controller"
    });
}

exports.userCreate = async (req, res, next) => {

    const { userId, name } = req.body;

    if (typeof userId !== "string") {
      res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof name !== "string") {
      res.status(400).json({ error: '"name" must be a string' });
    }

    const insert = {
        userId: uuidv4(),
        name: name
    }

    try {
      await usersModel.create(insert);
      res.json(insert);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not create user" });
    }
  };