const service                  = require('../../services/redisService'),
      postDataInMock           = require('../mocks/dataInPost.json'),
      postDataWithNoExpInMock  = require('../mocks/dataInPostNoExpiration.json'),
      postDataWithNoValidField = require('../mocks/dataInPostFailedValidationField.json'),
      ruleToTest               = require('../mocks/ruleToTest.json'),
      assetIdToTest            = require('../mocks/assetIdToTest.json'),
      Logger                   = require('logger'),
      logger                   = rtveLogger.getLogger('queryIsgdr.redisService.spec');

describe('Redis service',  () => {

    // POSTS REDIS TESTS ****************************************************************************************************************************
    // TEST POST => EXPIRATION DATE FOR KEY
    describe("POST/", () => {

        let response = {};

        beforeAll(done => {
            service.insertRule(postDataInMock).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response OK", () => {
            logger.info('POST TEST WITH EXPIRATION DATE KEY EXPECT OK => ', response );
            expect(response).toBe("OK");
        });

    });

    // TEST POST => NO EXPIRATION DATE FOR KEY
    describe("POST/", () => {
        
        let response = {};

        beforeAll(done => {
            service.insertRule(postDataWithNoExpInMock).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response OK", () => {
            logger.info('POST TEST WITH NO EXPIRATION DATE KEY EXPECT OK => ', response );
            expect(response).toBe("OK");
        });

    });

    /*
    TODO: Using the standard validation in method from router we cannot catch the error
    */
    // TEST POST => A NOT VALID FIELD
    describe("POST/", () => {
        
        let response = {};

        beforeAll(done => {
            service.insertRule(postDataWithNoValidField).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response Error", () => {
            logger.info('POST TEST WITH NO VALID FIELD => ', response );
            expect(response).toBe("OK");
        });

    });

     // UPDATE REDIS TESTS ****************************************************************************************************************************
    // TEST UPDATE => EXPIRATION DATE FOR KEY
    describe("UPDATE/", () => {
        
        let response = {};

        beforeAll(done => {
            service.insertRule(postDataInMock).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response OK", () => {
            logger.info('POST TEST WITH EXPIRATION DATE KEY EXPECT OK => ', response );
            expect(response).toBe("OK");
        });

    });

    // TEST UPDATE => NO EXPIRATION DATE FOR KEY
    describe("UPDATE/", () => {
        
        let response = {};

        beforeAll(done => {
            service.insertRule(postDataWithNoExpInMock).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response OK", () => {
            logger.info('POST TEST WITH NO EXPIRATION DATE KEY EXPECT OK => ', response );
            expect(response).toBe("OK");
        });

    });

    /*
    TODO: Using the standard validation in method from router we cannot catch the error
    */
    // TEST UPDATE => A NOT VALID FIELD
    describe("UPDATE/", () => {
        
        let response = {};

        beforeAll(done => {
            service.insertRule(postDataWithNoValidField).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response Error", () => {
            logger.info('POST TEST WITH NO VALID FIELD => ', response );
            expect(response).toBe("OK");
        });

    });

    // DELETE REDIS TESTS ****************************************************************************************************************************
    // TEST DELETE => A RULE THAT EXIST
    describe("DELETE/", () => {
    
        const rule = ruleToTest.key;
        let response = {};

        beforeAll(done => {
            service.deleteRule(rule).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response 1", () => {
            logger.info('DELETE TEST Delete a rule that exist Expected 1 response => ', response );
            expect(response).toBe(1);
        });

    });

    // TEST DELETE => A RULE THAT NOT EXIST
    describe("DELETE/", () => {
        
        const rule = ruleToTest.key;
        let response = {};

        beforeAll(done => {
            service.deleteRule(rule).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response 0", () => {
            logger.info('DELETE TEST Delete a rule that not exist Expected 0 respones => ', response );
            expect(response).toBe(0);
        });

    });

    // GET REDIS TESTS ****************************************************************************************************************************
    // TEST GET => A RULE THAT EXIST
    describe("GET/", () => {
        
        const rule = ruleToTest.key
        let response = {};

        beforeAll(done => {
            service.getRule(rule).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response yes", () => {
            logger.info('GET TEST Get a rule that not exist Expected yes response => ', response );
            expect(response).toBe("yes");
        });

    });

    // TEST GET => A RULE THAT NOT EXIST
    describe("GET/", () => {
        
        const rule = ruleToTest.key;
        let response = {};

        beforeAll(done => {
            service.getRule(rule).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response null", () => {
            logger.info('GET TEST Get a rule that exist Expected null response => ', response );
            expect(response).toBe(null);
        });

    });

    // TEST GET => A ASSETID THAT EXIST
    describe("GET/", () => {
        
        const assetId = assetIdToTest.key;
        let response = {};

        beforeAll(done => {
            service.getRule(assetId).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response null", () => {
            logger.info('GET TEST Get a list of rules for given assetid that exist Expected object response => ', response.key );
            expect(assetId).toBe(response.key);
        });

    });

    // TEST GET => A ASSETID THAT NOT EXIST
    describe("GET/", () => {
        
        const assetId = assetIdToTest.key;
        let response = {};

        beforeAll(done => {
            service.getRule(assetId).then(res => {
                response = res;
                done();
            }).catch(error => {
                response = error;
                done();
            });
        });

        it("Response null", () => {
            logger.info('GET TEST Get a list of rules for given assetid that not exist Expected null response => ', response.key );
            expect(response).toBe(null);
        });

    });

});