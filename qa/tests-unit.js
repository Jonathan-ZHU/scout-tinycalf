/*jshint esversion: 6 */

/*
单元测试
*/


var okcoin = require('okcoinapi-tinycalf');
var expect = require('chai').expect;

const API_KEY = "ec7e8719-d39f-468c-b473-6abd8bf8c0d2";
const SECRET_KEY = "3F5A4B381253184BB3EE65E8FF038018";

var client = new okcoin({apiKey:API_KEY,apiKeySecret:SECRET_KEY});



// client.tickerApi({symbol:'btc_cny'},function(err,ret){
//   suite('okcoinapi online test', function(){
//     test('okcoin api should return data with no err', function(){
//       expect(err).to.be.equal(null);
//     });
//   });
// });
//
// describe('okcoinapi online test', function() {
//   it('okcoin api should return data with no err', function() {
//     expect(add(1, 1)).to.be.equal(2);
//   });
// });

describe('okcoinapi test', function() {
    it('okcoin api connected', function(done) {
        this.timeout(0);
        client.tickerApi({symbol:'btc_cny'},function(err,ret){
            if(err) done(err);
            else done();
        });
    });
});
