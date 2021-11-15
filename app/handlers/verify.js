const db = require('../config/db');

function isFieldEmpty(form) {
  for (const [key, value] of Object.entries(form)) {
    if (!value) {
      return res.render('error', {error: 'The form cannot be empty'})
    }
  }
}

function isEmailInDatabase(user, res) {
  db.query(
    'SELECT * FROM users WHERE email = $1',
    [user.email])
    .then(dbRes => {
      if (dbRes.rows.length > 0) {
        return res.render('error', {error: 'The email address already in use'})
      }
    })
    .catch(dbErr => console.log(dbErr)
    )
    }

  function isEmailNotInDatabase(user, res) {
    db.query(
      'SELECT * FROM users WHERE email = $1',
      [user.email])
      .then(dbRes => {
        if (dbRes.rows.length === 0) {
          return res.render('error', {error: 'The email address not found'})
        }
      })
      .catch(dbErr => console.log(dbErr)
      )
      }

// function isDateAvailable(newDate, res) {
//   const q = `SELECT day, start_at, end_at FROM schedule WHERE schedule.user_id=(SELECT id FROM users WHERE email='${newDate.email}')`;
//   db.query(q, (dbErr, dbRes) => {
//     const oldDate = dbRes.rows;

//     for (let i = 0; i < oldDate.length; i += 1) {
//       if (oldDate[i].day === newDate.day) {
//         const firstApprovedVer = ((newDate.start_at < newDate.end_at) && (newDate.end_at <= oldDate.start_at) && (oldDate.start_at < oldDate.end_at));
//         const secApprovedVer = ((oldDate.start_at < oldDate.end_at) && (oldDate.end_at < newDate.start_at) && (newDate.start_at < newDate.end_at));

//         if (firstApprovedVer && secApprovedVer) {
//           return;
//         }
//       }
//     }
//   });
// }

function ifAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/home');
  }
  next();
}

function ifNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = {
  isFieldEmpty,
  isEmailInDatabase,
  isEmailNotInDatabase,
  // isDateAvailable,
  ifAuthenticated,
  ifNotAuthenticated,
};
