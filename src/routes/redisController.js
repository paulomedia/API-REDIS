const Logger       = require('module-logger'),
      logger       = Logger.getLogger('api-redis.redisController'),
      properties   = require('properties')(process.env.NODE_ENV),
      express      = require('express'),
      config       = require('../modules/config'),
      redisService = require('../services/redisService');

module.exports = {
    /**
    * @function post Insert a new rule in REDIS
    * @param {object} req Request object
    * @param {object} res Response object
    * @return {object} response to caller
    */
    post(req, res){
        logger.info(`Controller insertRule request ${req.method} `);
      
        redisService.insertRule(req.body).then(response => {
            logger.debug(`Controller insertRule response => ${response} `);

            if ( response !== 'OK' ){
                res.status(400).send('Bad Request');
                return;
            }
            res.status(200).send('OK');
            
        }).catch(error => {
            logger.error(`Controller insertRule error    => ${error} `);

            res.status(500).send(error.message);

        });
    },

    /**
    * @function put Update a rule in REDIS
    * @param {object} req Request object
    * @param {object} res Response object
    * @return {object} response to caller
    */
    put(req, res){
        logger.info(`Controller updateRule request`);
      
        redisService.insertRule(req.body).then(response => {
            logger.debug(`Controller updateRule response => ${response} `);

            if ( response !== 'OK' ){
                res.status(400).send('Bad Request');
                return;
            }
            res.status(200).send('OK');

        }).catch(error => {
            logger.error(`Controller updateRule error    => ${error} `);

            res.status(500).send(error.message);

        });
    },

    /**
    * @function delete Delete a rule in REDIS
    * @param {object} req Request object
    * @param {object} res Response object
    * @return {object} response to caller
    */
    delete(req, res){
        logger.info(`Controller delete request`);
      
        redisService.deleteRule(req.params.key).then(response => {
            logger.debug(`Controller deleteRule response => ${response} `);

            if ( response === 0 ){
                res.status(452).send('Key not found');
                return;
            }

            res.status(200).send('OK');

        }).catch(error => {
            logger.error(`Controller deleteRule error    => ${error} `);

            res.status(500).send(error.message);
        });
    },

    /**
    * @function deleteExpiredRule Delete an expiered rule in set in REDIS
    * @param {object} req Request object
    * @param {object} res Response object
    * @return {object} response to caller
    */
    deleteExpiredRule(req, res){
        logger.info(`Controller deleteExpiredRule request`);
      
        redisService.deleteExpiredRule(req.params.key).then(response => {
            logger.debug(`Controller deleteExpiredRule response => ${response} `);

            if ( response === 0 ){
                res.status(452).send('Key not found');
                return;
            }

            res.status(200).send('OK');

        }).catch(error => {
            logger.error(`Controller deleteExpiredRule error    => ${error} `);

            res.status(500).send(error.message);
        });
    },

    /**
    * @function getRulesByAssetId Get rules in REDIS for specific assetId
    * @param {object} req Request object
    * @param {object} res Response object
    * @return {object} response to caller
    */
    getRulesByAssetId(req, res){
        logger.info(`Controller getRulesByAssetId request assetid =>  ${req.params.assetid} ` );
        
        redisService.getRules(req.params.assetid).then(response => {
            logger.debug(`Controller getRulesByAssetId response => ${response} `);

            const objResponse = {
                key: req.params.assetid,
                value: response
            };
            
            if ( response.length === 0 ){
                res.status(452).send('Key not found');
                return;
            }

            res.status(200).send(JSON.stringify(objResponse));

        }).catch(error => {
            logger.error(`Controller getRulesByAssetId error    => ${error} `);

            res.status(500).send(error.message);
        });

    },

    /**
    * @function existRule Check if exist some rule in REDIS
    * @param {object} req Request object
    * @param {object} res Response object
    * @return {object} response to caller
    */
    existRule(req, res){
        logger.info(`Controller existRule request `);

        redisService.existsRule(req.params.key).then(response => {
            logger.debug(`Controller existRule response => ${response} `);

            res.status(200).send(config.getExistResponse(response));

        }).catch(error => {
            logger.error(`Controller existRule error   => ${error} `);

            res.status(500).send(error.message);
        });
    }

};