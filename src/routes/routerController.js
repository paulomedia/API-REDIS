const express    = require('express'),
      router     = express.Router(),
      controller = require('./redisController');

// create rule
router.post('/key/', express.json(), controller.post);

// update rule
router.put('/key/', express.json(), controller.put);

// delete rule
router.delete('/key/:key', controller.delete);

// delete expired rule
router.delete('/expired/key/:key', controller.deleteExpiredRule);

// get rules by assetid
router.get('/keys/:assetid', controller.getRulesByAssetId);

// get rule
router.get('/key/:key', controller.existRule);

module.exports = router;