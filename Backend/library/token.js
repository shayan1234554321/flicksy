import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("Invalid Token");
  }

  const bearer = token.split(" ")[1];

  try {
    const decoded = jwt.verify(bearer, process.env.TOKEN_KEY);

    let user = await User.findOne({ _id: decoded.userId }).select("-password");

    if (!user) {
      return res.status(401).send("Invalid Token");
    }

    if (user.tokenCode !== decoded.tokenCode) {
      return res.status(401).send("Invalid Token");
    }

    req.user = { ...user.toObject(), token: bearer };
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export const generateToken = (userId, tokenCode) => {
  return jwt.sign({ userId, tokenCode }, process.env.TOKEN_KEY);
};
