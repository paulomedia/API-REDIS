const sinon           = require('sinon'),
      redisController = require('../../routes/redisController');

describe('Routes', () => {

   describe('Redis controller', () => {

     it("Spie Redis controller", () => {

       let req, res, spy, result;

       req = res = {};
       res.status = e => ({ json: e => e });

       spy = sinon.spy(res, "status");

       result = redisController(req, res);

       expect(result).toEqual(false);
       expect(spy.calledOnce).toEqual(true);
       expect(spy.callCount).toEqual(1);

     });

   });
});
