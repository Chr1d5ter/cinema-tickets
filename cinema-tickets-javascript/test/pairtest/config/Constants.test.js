import * as Constants from "../../../src/pairtest/config/Constants";
import { expect } from "chai";

test("ensure MIN_ACCOUNT_ID is set and is equal to 0", () => {
  expect(Constants.MIN_ACCOUNT_ID).equals(0);
});

test("ensure MAX_TICKETS_PER_TRANSACTION is set and is equal to 20", () => {
  expect(Constants.MAX_TICKETS_PER_TRANSACTION).equals(20);
});

test("ensure MAX_INFANTS_PER_ADULT is set and is equal to 1", () => {
  expect(Constants.MAX_INFANTS_PER_ADULT).equals(1);
});
