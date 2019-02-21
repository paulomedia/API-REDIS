/**
 * Modulo JS redisDB
 * 
 * @module redisDB
 */
const Logger = require('logger'),
      logger = Logger.getLogger('api-redis.redisController'),
      props  = require('properties')(process.env.NODE_ENV),
      redis  = require('redis');

module.exports = {
    /**
    * @function createClient Create a client from REDIS, make a connection
    * @return {promise} promise that resolve or reject
    */
    createClient(){
        return new Promise((resolve, reject) => {

            const options = {
                port: props.redis_port,
                host: props.redis_host_local,
                password: props.password
            };

            const redisClient = redis.createClient(options);
        
            redisClient.on('connect', () => {
                logger.debug(`Connection REDIS DB success!`);
                resolve(redisClient);
            });

            redisClient.on('error', error => {
                logger.error(`Connection REDIS DB refused  => ${JSON.stringify(error)} `);
                reject(redisClient);
            });
        });
    }

};