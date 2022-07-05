const router = require("express").Router();

const Location = require('../models/Location')

router.post('/addLocation', (req, res) => {
  Location.create(req.body)
      .then(() => {
        console.log('wewe')
        res.redirect('/')})
      .catch(error => console.log(error));
});

router.get("/", (req, res, next) => {
  Location.find()
  .then((locationFromDB) => {
    res.render("index", { locationList: locationFromDB });
  })
  .catch((err) => {
      next(err)
  })
})
router.get("/add", (req, res, next) => {
  res.render('add')
})

router.post('/locations/:locationId/delete', (req, res, next) => {
  const { locationId } = req.params;
 
  Location.findByIdAndDelete(locationId)
    .then(() => res.redirect('/'))
    .catch(error => next(error));
});

module.exports = router; 


