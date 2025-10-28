import jwt from "jsonwebtoken";

const auth = (roles = []) => {
  // roles param can be a single role string or an array of roles
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1]; // "Bearer <token>"
      if (!token) {
        return res.status(401).json({ message: "Token missing" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      // Check if user's role is allowed
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Not authorized" });
      }

      // Optional: for admin, check specific email if required
      if (decoded.role === "admin" && decoded.email !== process.env.ADMIN_EMAIL) {
        return res.status(403).json({ message: "Admin email not authorized" });
      }

      // Pass user info to request for later use
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default auth;
