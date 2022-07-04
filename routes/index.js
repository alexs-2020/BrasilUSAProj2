const router = require("express").Router();

/* GET home page */

const location = require('../models/Location')
router.get("/", (req, res, next) => {
  location.find()
  .then((locationFromDB) => {
    res.render("index", { locationList: locationFromDB });
  })
  .catch((err) => {
      next(err)
  })
})
module.exports = router;
