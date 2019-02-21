/**
 * Modulo JS client
 * 
 * @module client
 */

const redis      = require('./redisDB'),
      Logger     = require('logger'),
      logger     = Logger.getLogger('queryIsgdr.client'),
      properties = require('properties')(process.env.NODE_ENV);

/**
 * @function eventExpiredKey Subscribe the event to know when the date of expiration from the rule has been expired
 * @param {string} key The key of the rule
 * @return {void} return void
 */
const eventExpiredKey = (key, client) => {
    client.subscribe(key, () => {
        logger.info(`Service eventExpiredKey success in subscribe event to key => ${key} expired`);
    });
};

module.exports = {
    /**
     * @function exists Check if existe a key in REDIS
     * @param {string} key The key of the rule
     * @return {promise} Promise that resolve or reject
    */
    exists(key){
        return new Promise((resolve, reject) => {
            redis.createClient().then(client => {
                client.exists(key, (error, reply) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(reply);
                });
            }).catch(error => {
                reject(error);
            });
        });
    },
    
    /**
     * @function setRuleInList Set a list of rules for the same assetid
     * @param {string} list The list to insert in REDIS
     * @return {promise} Promise that resolve or reject
    */
    setRuleInList(list){
        return new Promise((resolve, reject) => {
            redis.createClient().then(client => {
                client.sadd(list, (error, reply) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(reply);
                });
            }).catch(error => { 
                reject(error);
            });
        });
    },

    /**
     * @function deleteRuleInList Delete a rule in a list of rules
     * @param {string} list The list to delete in REDIS
     * @return {promise} Promise that resolve or reject
    */
    deleteRuleInList(list){
        return new Promise((resolve, reject) => {
            redis.createClient().then(client => {
                client.srem(list, (error, reply) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(reply);
                });
            }).catch(error => { 
                reject(error);
            });
        });
    },

    /**
     * @function get Get the list of rules for a specific assetid in REDIS
     * @param {string} assetid The key of the list of rules
     * @return {promise} Promise that resolve or reject
    */
    getList(assetid){
        return new Promise((resolve, reject) => {
            redis.createClient().then(client => {
                client.smembers(assetid, (error, reply) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(reply);
                });
            }).catch(error => { 
                reject(error);
            });
        });
    },

    /**
     * @function insert Insert a key in REDIS
     * @param {string} key The key of the rule
     * @param {string} value The value of the key
     * @param {string} seconds The number of seconds
     * @return {promise} Promise that resolve or reject
    */
    insert(key, value, seconds){
        return new Promise((resolve, reject) => {
            redis.createClient().then(client => {
                // if we don't have seconds we make a normal set
                if ( seconds === 0 ){
                    logger.debug(`Service insert rule => ${key} `);
                    client.set(key, value, (error, value) => {
                        if (error){
                            return reject(error);
                        }
                        resolve(value);
                    }); 
                    return;
                }
                // if not we make a set with a expieration time
                logger.debug(`Service insert rule with expiration => ${key} `);
                client.set(key, value, properties.expiration, seconds, (error, value) => {
                    // subscribe the event to rule with expiration date
                    eventExpiredKey(key, client);
                    if (error){
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
     * @function delete Delete a key from REDIS
     * @param {string} key The key of the rule
     * @return {promise} promise that resolve or reject
    */
    delete(key){
        return new Promise((resolve, reject) => {
            redis.createClient().then(client => {
                client.del(key, (error, value) => {
                    if (error){
                        return reject(error);
                    }
                    resolve(value);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }

};