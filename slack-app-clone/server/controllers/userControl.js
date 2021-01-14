const User = require("../models/usermodel"); // importing the user model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// defaultroute function
exports.default = async (req, res) => {
  try {
    await User.find(); // checking the default route
    return res.json({
      status: true,
      message: "default route is working...",
    });
  } catch (err) {
    return res.json("Error" + err);
  }
};

// Registration function

exports.register = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }) // checking if email is already exist
      .exec((newUser, existUser) => {
        if (existUser) {
          // if exist
          return res.json({
            message: "Email is already registered...",
          });
        } else {
          // if not
          User.create(
            {
              fname: req.body.fname, // then creating the user in database
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 8), // hashing the password
              confirmpassword: bcrypt.hashSync(req.body.confirmpassword, 8),
            },
            (error, result) => {
              if (!error) {
                // if all ok
                return res.json({
                  status: true,
                  message: "User Registered Successfully",
                  result,
                });
              } else {
                // if error
                return res.json({
                  status: false,
                  message: "Registration failed...",
                  error,
                });
              }
            }
          );
        }
      });
  } catch (err) {
    return res.json("error" + err);
  }
};

// login function

exports.login = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, (errors, result) => {
      // check error
      if (errors) {
        return res.json({
          status: true,
          message: "email does not exist",
          errors: errors,
        });
      }
      // result is empty or not
      else if (result) {
        // when result ha ssome doc
        // then match the password
        const match = bcrypt.compareSync(req.body.password, result.password);
        // check password is match or not
        if (match) {
          // password matched
          let token = jwt.sign({ _id: result._id }, "verySecretValue", {
            expiresIn: "5h",
          });
          return res.json({
            status: true,
            message: "Password matched.... login success....",
            result: result,
            token: token, // it give the token in result
          });
        } else {
          // password not matched
          return res.json({
            status: false,
            message: "Password do not matched....   login failed...",
          });
        }
      } else {
        // user doc doesnot exist
        return res.json({
          status: false,
          message: "user not exist....",
        });
      }
    });
  } catch (err) {
    return res.json("error" + err);
  }
};
// find user function

exports.findUser = async (req, res) => {
  try {
    await User.findOne(
      { email: req.body.email },
      { password: 0 },
      (error, result) => {
        if (!error) {
          return res.json({
            status: true,
            message: "User found...",
            result,
          });
        } else {
          return res.json({
            status: false,
            message: "User not found...",
            error,
          });
        }
      }
    );
  } catch (err) {
    return res.json("error" + err);
  }
};
// delete user function

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ email: req.body.email }, (error, result) => {
      // quering by email in database
      if (!error) {
        // if all ok
        return res.json({
          status: true,
          message: "user deleted...",
          result,
        });
      } else {
        // any error occurs
        return res.json({
          status: false,
          message: "user not deleted...",
          error,
        });
      }
    });
  } catch (err) {
    return res.json("error" + err);
  }
};
