const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Token is required" }); // No token provided
  }

  jwt.verify(token, "gdgdggedRWTW", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" }); // Invalid token
    }

    req.user = user; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
