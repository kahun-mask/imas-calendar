const router = require('express').Router();
const { commandSwitcher } = require('../service/command');

router.post('/slack/slash', function(req, res) {
  var payload = req.body;
  commandSwitcher(payload)
    .then(context => {
      res.send(context);
    });
});

module.exports = router;
