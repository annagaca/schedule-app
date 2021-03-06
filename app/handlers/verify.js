const db = require("../config/db");
const logger = require("../config/logger");

function isFieldEmpty(form) {
  for (const [_key, value] of Object.entries(form)) {
    return !value;
  }
}

async function isEmailInDatabase(user) {
  return db
    .query("SELECT * FROM users WHERE email = $1", [user.email])
    .then((dbRes) => dbRes.rows.length > 0)
    .catch((dbErr) => logger.log("error", `${dbErr}`));
}

function ifAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  return next();
}

function ifNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
}

module.exports = {
  isFieldEmpty,
  isEmailInDatabase,
  ifAuthenticated,
  ifNotAuthenticated,
};
