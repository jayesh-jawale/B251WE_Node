import express from "express";
import { createUser, genPassword } from "./helper.js";
const router = express.Router();

router.route('/signup').post( async (req, res) => {
    const {username, password} = req.body;

    const hashedPassword = await genPassword(password);
    const result = await createUser({
        username: username,
        password: hashedPassword,
    })
    res.send(result)
  })

export const userRouter = router;