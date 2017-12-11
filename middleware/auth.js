// const passport = require('passport');
// const User = require ('../model/user');
//
// passport.use (user.createstrategy());
//
// function register (req, res, next) {
//   const user = new User ({
//     // attribitues coming in from the wire
//     email: req.body.email,
//     firstName: req.body.first,
//     lastName: req.body.lastName
//   });
//   User.register(user, req.body.password, (error, user) => {
//     if (error) {
//       next(error);
//       return;
//     }
//     res.user = user;
//     next();
//   })
// }
//
// module.exports = {
//   register,
//   signIn: passport.authenticate('local', { session: false })
// }

const passport = require('passport');
const User = require('../model/user');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


function register(req, res, next){
  const user = new User({
    // attributes coming in from the wire
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  User.register(user, req.body.password, (error,user)=>{
    if (error){
      next(error);
      return;
    }
    // store user in the req
    req.user = user;
    next();
  })
}

module.exports = {
  initialize: [passport.initialize(),passport.session()],
  register,
  signIn: passport.authenticate('local',{session: true})
}
