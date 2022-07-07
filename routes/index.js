const router = require("express").Router();

/* GET home page */
const Location = require('../models/Location')
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model')
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

router.post('/addLocation', (req, res) => {
  Location.create(req.body)
      .then(() => {
        res.redirect('/map')})
      .catch(error => console.log(error));
});

router.get("/", (req, res, next) => {
  res.render('index')
})



router.get('/locations', (req,res) =>{
  Location.find()
  .then((locationFromDB) => {
    res.json({ locationList: locationFromDB })
  })
  .catch(error => console.log(error));
})


router.get('/map', isLoggedIn, (req,res)=> 
  Location.find()
  .then((locationFromDB) => {
    res.render("map", { locationList: locationFromDB });
  })
  .catch((err) => {
      next(err)
  })
  )

//auth

//auth routes
router.get('/signup', isLoggedOut, (req, res)=>{
  res.render('auth/signup')
})

router.post('/signup', (req,res,next)=>{
  const { username, password } = req.body;
 
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username: username,
        password: hashedPassword
      })
    })
    .then(userFromDB =>{
      res.redirect('/')
    })
    .catch(error => next(error));
});


router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  console.log('SESSION =====> ', req.session);
  if (username === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, username and password to login.'
    });
    return;
  }
  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'User is not registered.' });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.render('userProfile', { user });
        // res.render('map');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

router.get('/userProfile', (req,res)=>{
  let username = req.session.currentUser.username
  console.log(req.session.currentUser)
  User.findOne({username})
  .then(user =>{ 
    res.render('userProfile', { user });
  })
})


router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  })
});


router.post('/locations/:locationId/delete', (req, res, next) => {
  const { locationId } = req.params;

  Location.findByIdAndDelete(locationId)
    .then(() => res.redirect('/map'))
    .catch(error => next(error));
});



module.exports = router;
