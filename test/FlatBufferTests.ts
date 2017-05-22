/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import chai = require('chai');
import FlatBuffer = require('../FlatBuffer');

/**
* These tests cover the basics
*/
describe("FlatBuffer Buffer()", () => {

    it.only("should build, read & write a valid flatbuffer from a json specification", (done) =>
    {
        chai.expect(FlatBuffer.Buffer("w:\\Work\\itter\\test\\files\\Proximus.json")).to.be.true;
        //chai.expect(FlatBuffer.Buffer("w:\\Work\\itter\\test\\files\\testSpec.json")).to.be.true;
        done();
    });
});
