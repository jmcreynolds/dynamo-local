const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const { usersModel } = require("../models/user.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const results = await usersModel.scan().exec();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could get users" });
  }
}

exports.getUser = async (req, res, next) => {
  let userId = req.params.id;
  try {
    const results = await usersModel.get(userId);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not find user" });
  }
}

exports.userUpdate = async (req, res, next) => {

  let userId = req.params.id;
  const { name } = req.body;
  console.log(name);

  try {
    await usersModel.update(userId, req.body);
    res.status(201).json({ result: "Content updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update user" });
  }
}

exports.userDelete = async (req, res, next) => {

  let userId = req.params.id;

  try {
    const results = await usersModel.get(userId);
    if(results){
      await usersModel.delete(userId);
      res.json({ "message":  results});
    }else{
      res.status(400).json({ error: "Could not find user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }

}

exports.userCreate = async (req, res, next) => {

    const { name } = req.body;

    if (typeof name !== "string") {
      res.status(400).json({ error: '"name" must be a string' });
    }

    const insert = {
        userId: uuidv4(),
        name: name,
        alerts: 1
    }

    try {
      await usersModel.create(insert);
      res.json(insert);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not create user" });
    }
  };