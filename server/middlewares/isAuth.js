// import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";

// export const isAuth = async (req, res, next) => {
//   try {
//     const { token } = req.headers;

//     if (!token)
//       return res.status(403).json({
//         message: "Please login",
//       });

//     const decodedData = jwt.verify(token, process.env.JWT_SEC);

//     req.user = await User.findById(decodedData._id);

//     next();
//   } catch (error) {
//     res.status(500).json({
//       message: "Please login",
//     });
//   }
// };


import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(403).json({
        message: "Please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);

    const user = await User.findById(decoded._id).select("name email role");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token, please login again",
    });
  }
};