const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

const JWT_SECRET ='mynameiskunal:)'
//ROUTE 1: create a User using: POST "api/auth/creatuser" . NO Login required .
router.post(
  "/createuser",
  [
    body("name", "name must be of atleast 3 characters").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be of atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let success=false;
      const salt = bcrypt.genSaltSync(10);
      const secPass = bcrypt.hashSync(req.body.password, salt);
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      .then((user) => {
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data , JWT_SECRET );
        success=true;
          res.json({success,authtoken})
        })

        .catch((error) => {
          console.log(error),
          success=false
            res.json({success,
              error: "this email has been already taken",
              message: error.message,
            });
        });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 2: Authenticate a User using: POST "api/auth/login" . 

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isLength({
      min: 5,
    }),
  ],
  async(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
   
    try {
      let success= false;
     let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"please enter valid credentials"})
      }
      const passcompare = await bcrypt.compare(password,user.password)
      if(!passcompare){
        return res.status(400).json({error:"please enter valid credentials"})
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data , JWT_SECRET );
      success=true;
      res.json({success,authtoken})

    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error")
    }
  }
);


//ROUTE 3: Get Loggedin User Details using: POST "api/auth/getuser" . Login required .

router.post(
"/getuser",fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password"); 
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error")
  }
}
);

module.exports = router;
