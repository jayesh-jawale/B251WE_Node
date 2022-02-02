import express, { response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, genPassword, getUserByName } from "./helper.js";
const router = express.Router();

router.route('/signup').post( async (req, res) => {
    const {username, password} = req.body;
    // Check if username already exists
    const isUserExist = await getUserByName(username)
    if(isUserExist) {
      res.status(401).send({message: 'User already exists'})
      return;
    }
    // Check passsword strength, password pattern
    if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)) {
      res.status(401).send({message: 'Password did not match'})
      return;
    }

    const hashedPassword = await genPassword(password);
    const result = await createUser({
        username: username,
        password: hashedPassword,
    })
    res.send(result)
})

router.route('/signin').post( async (req, res) => {
  const {username, password} = req.body;
  const userFromDB = await getUserByName(username)
  if(!userFromDB) {
    res.status(401).send({message: 'Invalid Credentials'})
    return;
  }
  
  const storedPassword = userFromDB.password;
  const isPasswordMatch = await bcrypt.compare(password, storedPassword);
  if(isPasswordMatch) {
    // issue the token
    const token = jwt.sign({id : userFromDB._id}, process.env.SECRET_KEY);
    res.send({message: "Successfull login", token: token})
  }
  else {
    res.status(401).send({message: 'Invalid Credentials'})
    return;
  }
})

export const userRouter = router;