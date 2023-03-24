import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest";
import { expect } from "chai";
import { MAX_TICKETS_PER_TRANSACTION } from "../../../src/pairtest/config/Constants";

test("the constructor should throw a TypeError given an invalid ticketType 'INVALID_TICKET_TYPE' ", () => {
  expect(() => new TicketTypeRequest("INVALID_TICKET_TYPE", 1)).to.throw(
    TypeError
  );
});

test("the constructor should not throw for a valid ticketType ( ADULT, CHILD, INFANT )", () => {
  expect(() => new TicketTypeRequest("ADULT", 1)).to.not.throw();
  expect(() => new TicketTypeRequest("CHILD", 1)).to.not.throw();
  expect(() => new TicketTypeRequest("INFANT", 1)).to.not.throw();
});

test("the constructor to throw a TypeError if a non-numeric noOfTickets is passed", () => {
  expect(() => new TicketTypeRequest("ADULT", "one")).to.throw(TypeError);
});

test("the constructor to throw a RangeError if a negative noOfTickets is passed", () => {
  expect(() => new TicketTypeRequest("ADULT", -1)).to.throw(RangeError);
});

const tooManyTickets = MAX_TICKETS_PER_TRANSACTION + 1;

test(`the constructor to throw a RangeError if a too large ( ${tooManyTickets} ) noOfTickets is passed`, () => {
  expect(() => new TicketTypeRequest("ADULT", tooManyTickets)).to.throw(
    RangeError
  );
});

test("the constructor should allow a noOfTickets equal to the MAX_TICKETS_PER_TRANSACTION", () => {
  expect(
    () => new TicketTypeRequest("ADULT", MAX_TICKETS_PER_TRANSACTION)
  ).to.not.throw(RangeError);
});

test("the needSeatForTicketType method to ensure ADULT and CHILDREN need a seat whereas INFANTS do not", () => {
  let ticketTypeRequest = new TicketTypeRequest("ADULT", 1);
  expect(ticketTypeRequest.needSeatForTicketType()).to.equal(true);
  ticketTypeRequest = new TicketTypeRequest("CHILD", 1);
  expect(ticketTypeRequest.needSeatForTicketType()).to.equal(true);
  ticketTypeRequest = new TicketTypeRequest("INFANT", 1);
  expect(ticketTypeRequest.needSeatForTicketType()).to.equal(false);
});

test("the calculateCost method returns the correct total for 4 ADULT ( 4 * 20 = 80 )", () => {
  let ticketTypeRequest = new TicketTypeRequest("ADULT", 4);
  expect(ticketTypeRequest.calculateCost()).equals(80);
});

test("the calculateCost method returns the correct total for 8 CHILD ( 3 * 10 = 30 )", () => {
  let ticketTypeRequest = new TicketTypeRequest("CHILD", 3);
  expect(ticketTypeRequest.calculateCost()).equals(30);
});

test("the calculateCost method returns the correct total for 2 INFANTS ( 2 * 0 = 0 )", () => {
  let ticketTypeRequest = new TicketTypeRequest("INFANT", 2);
  expect(ticketTypeRequest.calculateCost()).equals(0);
});
