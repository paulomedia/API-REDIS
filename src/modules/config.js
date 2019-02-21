/**
 * Modulo JS config
 * 
 * @module config
 */

/**
 * @function hasDateExpirationKey Check if exist the key date_expiration_key in the rule
 * @param {string} rule The rule to check
 * @return {boolean} return a boolean value
 */
const hasDateExpirationKey = rule => {
    return rule.hasOwnProperty('date_expiration_key');
};

module.exports = {
    /**
    * @function getExistResponse Get the response in json format
    * @param {boolean} value Request object
    * @return {object} object in the format { exist:value }
    */
    getExistResponse(value){
        return {
            exist: value === 1
        };
    },

    /**
     * @function getAssetId Get the assetId from rule
     * @param {string} value Represents a rule in format assetId:country:value:expiration_date or assetId:country:value
     * @return {string} return a string value
     */
    getAssetId(value){
        return value.split(':')[0];
    },

    /**
     * @function getDateExpirationKey Get the value of propertie date_expiration_key if don't exist return empty ''
     * @param {string} rule The rule to check
     * @return {string} return a string value
     */
    getDateExpirationKey(rule){
        return hasDateExpirationKey ? rule.date_expiration_key : '';
    },

    /**
     * @function getSecondsExpirateKey Get the value in seconds from the propertie date_expiration_key of the rule if exist
     * @param {string} rule The rule to check
     * @return {number} return a number value
     */
    getSecondsExpirateKey(rule){
        return hasDateExpirationKey(rule) ? Number(rule.date_expiration_key) : 0;
    }

};