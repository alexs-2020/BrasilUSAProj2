const router = require("express").Router();

/* GET home page */
const Location = require('../models/Location')

router.post('/addLocation', (req, res) => {
  Location.create(req.body)
      .then(() => {
        console.log('wewe')
        res.redirect('/map')})
      .catch(error => console.log(error));
});

router.get("/", (req, res, next) => {
  res.render('index')
})
router.get("/add", (req, res, next) => {
  res.render('add')
})

router.get('/map', (req,res)=> 
  Location.find()
  .then((locationFromDB) => {
    res.render("map", { locationList: locationFromDB });
  })
  .catch((err) => {
      next(err)
  })
  )

//auth
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model')

//auth routes
router.get('/signup', (req, res)=>{
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

router.post('/locations/:locationId/delete', (req, res, next) => {
  const { locationId } = req.params;

  Location.findByIdAndDelete(locationId)
    .then(() => res.redirect('/map'))
    .catch(error => next(error));
});



module.exports = router;
