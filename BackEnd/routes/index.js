var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", UserController.login);
router.post("/createUser", UserController.createUser);

module.exports = router;
