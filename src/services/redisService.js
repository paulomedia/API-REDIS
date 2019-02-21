const Logger     = require('logger'),
      logger     = rtveLogger.getLogger('api-redis.redisService'),
      properties = require('properties')(process.env.NODE_ENV),
      config     = require('../modules/config'),
      client     = require('../modules/client');
      
/**
 * @function deleteRuleFromList Delete a rule from the list of rules for a specific assetid
 * @param {string} rule The rules to delete in type registry
 * @param {function} callback Pass the error or a value to the caller
 */
const deleteRuleFromList = (rule, callback) => {
    // get the assetid correspond to this deleted rule
    const assetid = config.getAssetId(rule); 

    let list = [assetid, rule];
    
    client.deleteRuleInList(list).then(reply => {
        return callback(null, reply);
    }).catch(error => {
        return callback(error, null);
    });
    
};

/**
 * @function insertRuleInList Insert a rule in the list of rules for a specific assetid
 * @param {string} rule The rules to delete in type registry
 * @param {function} callback Pass the error or a value to the caller
 */
const insertRuleInList = (rule, callback) => {
    // get the assetid correspond to this insterted rule
    const assetid = config.getAssetId(rule); 

    const list = [assetid, rule];

    client.setRuleInList(list).then(reply => {
        return callback(null, reply);
    }).catch(error => {
        return callback(error, null);
    });

};
 
module.exports = {
    /**
    * @function insertRule Insert or update a new rule in Redis
    * @param {string} rule Rule 
    * @return {promise} Promise that resolve or reject
    */
    insertRule(rule) {
        logger.debug(`Service insertRule rule    => ${JSON.stringify(rule)} `);

        // get the seconds to know if we set with date of expiration or not
        const seconds = config.getSecondsExpirateKey(rule);

        return new Promise((resolve, reject) => {

            client.insert(rule.key, rule.value, seconds).then(value => {
                logger.debug(`Service insertRule rule.key => ${rule.key} ` );

                if ( value !== 'OK' ){
                    return resolve(value);
                }

                // we insert a new rule in the list of rules for this assetId
                insertRuleInList(rule.key, (error, value) => {
                    if (error){
                        return reject(error);
                    }
                    resolve('OK');
                });
                
            }).catch(error => {
                reject(error);
            });
            
        });

    },

    /**
    * @function deleteRule Delete a existent rule in REDIS
    * @param {string} rule Rule 
    * @return {promise} Promise that resolve or reject
    */
    deleteRule(rule) {
        logger.debug(`Service deleteRule rule  => ${rule} `);

        return new Promise((resolve, reject) => {
            client.delete(rule).then(value => {

                // if value is 0 mean that don't exist any rule, we return it
                if ( value === 0 ){
                    logger.warn(`Service deleteRule cannot delete a rule with key => ${value} `);
                    return resolve(value);
                }

                // the rule aldready has been deleted form type1 registry
                // we delete this rule from the list of rules in type2 registry
                deleteRuleFromList(rule, (error, value) => {
                    if ( error ){
                        return reject(error);
                    }
                    resolve(value);
                });
                
            }).catch(error => {
                reject(error);
            });
        });
    },

    /**
    * @function deleteExpiredRule Delete a deleted rule in REDIS by expiration date
    * @param {string} rule Rule 
    * @return {promise} Promise that resolve or reject
    */
    deleteExpiredRule(rule) {
        logger.debug(`Service deleteExpiredRule rule  => ${rule} `);

        return new Promise((resolve, reject) => {
            // this rule aldready has been deleted form expiration date in REDIS registry
            // we delete this rule from the list of rules in set registry
            deleteRuleFromList(rule, (error, value) => {
                if ( error ){
                    console.log('Service deleteExpiredRule error  => ');
                    return reject(error);
                }
                resolve(value);
            });
        });
    },
    
    /**
    * 
    * @function existsRule Check if exists a rule in REDIS
    * @param {string} key Rule, can be in assetId:country:value_rule:date_expiration_rule format or assetId:country:value_rule
    * @return {promise} Promise that resolve or reject
    */
    existsRule(key){
        logger.debug(`Servicio existsRule key => ${key} `);
        
        return new Promise((resolve, reject) => {
            client.exists(key).then(value => {
                resolve(value);  
            }).catch(error => {
                reject(error);
            });
        });
    },

    /**
     * 
    * @function getRules Get a list of rules in REDIS
    * @param {string} key Content identify
    * @return {promise} Promise that resolve or reject
    */
    getRules(key) {
        logger.debug(`Servicio getRules key => ${key} `);

        return new Promise((resolve, reject) => {
            client.getList(key).then(value => {
                resolve(value);  
            }).catch(error => {
                reject(error);
            });
        });
    }

};