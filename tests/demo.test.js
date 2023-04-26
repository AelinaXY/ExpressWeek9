const {expect} = require("chai");
const primeTest = require("../maths.js");
describe("test suite", () =>{
    it("Prime Test: 1", () => {
        expect(primeTest(1)).to.equal(false);
    });
    it("Prime Test: 2", () => {
        expect(primeTest(2)).to.equal(true);
    });
    it("Prime Test: 1227", () => {
        expect(primeTest(1227)).to.equal(false);
    });
    it("Prime Test: 5678", () => {
        expect(primeTest(5678)).to.equal(false);
    });
    it("Prime Test: 5641", () => {
        expect(primeTest(5641)).to.equal(true);
    });
    it("Prime Test: 137143", () => {
        expect(primeTest(137143)).to.equal(true);
    });

})