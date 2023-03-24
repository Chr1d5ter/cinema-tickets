import AccountClass from "../../../src/pairtest/classes/AccountClass";
import { expect } from "chai";

const validAccountId = 100000001;

test("Should throw TypeError for string account id", () => {
  expect(() => new AccountClass("bad_account_id")).to.throw(TypeError);
});

test("Should throw RangeError for a negative account id", () => {
  expect(() => new AccountClass(-1).to.throw(RangeError));
});

test("Should not error for a valid account id", () => {
  expect(() => new AccountClass(1000000)).to.not.throw();
});

test(`Should have an accessor method for accountId that returns the value set in the constructor ${validAccountId}`, () => {
  const account = new AccountClass(validAccountId);
  expect(account.getAccountId()).to.equal(validAccountId);
});
