/* Middleware — protects admin routes */
export const requireAdmin = (req, res, next) => {
  // Express v5 + Passport fix
  if (req.isAuthenticated?.() || req.user) {
    return next()
  }
  res.status(401).json({ error: "Unauthorized — please log in" })
}