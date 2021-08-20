const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    console.log(user);
    if(!user.position)
    	return res.status(403).json({message: "You don't have permission to access!"});
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};