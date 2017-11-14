/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import chai = require('chai');

import It = require('../Itter');

/**
* These tests cover the basics
*/
describe.only("It", function() {

    it("should welcome you cheerily", function (done)
    {
        chai.expect(It.WelcomesYouCheerily()).to.equal("Hello! :)");
        done();
    });
});
