const action = {
    ADD: 'A',
    MODIFY: 'M',
    DELETE: 'D'
};

const methodHttp = {
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    GET: 'GET'
};

const msg = {
    PARAM: 'Request param is null or Empty',
    BODY: 'Request body is null or empty',
    ASSETID: 'assetId in rule does not exist or is wrong',
    COUNTRY: 'country in rule does not exist or is wrong',
    VALUE_RULE: 'value_rule in rule does not exist or is wrong',
    DATE_EXPIRATION_RULE: 'date_expiration_rule in rule is wrong',
    VALUE: 'value does not exist or is wrong',
    DATE_EXPIRATION_KEY: 'date_expiration_key is wrong'
};

module.exports = { action, methodHttp, msg };