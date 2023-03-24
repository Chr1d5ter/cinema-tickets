import TicketService from "../../src/pairtest/TicketService";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException";
import { expect } from "chai";
import { jest } from "@jest/globals";

const validAccountId = 100000001;

test("the TicketService should throw InvalidPurchaseException given a bad accountId", () => {
  const ticketService = new TicketService();
  expect(() => ticketService.purchaseTickets("abc", { ADULT: 1 })).to.throw(
    InvalidPurchaseException
  );
});

test("the TicketService should throw InvalidPurchaseException given too many tickets 20 ADULTS, 20 CHILD", () => {
  const ticketService = new TicketService();
  expect(() =>
    ticketService.purchaseTickets(validAccountId, { ADULT: 20, CHILD: 20 })
  ).to.throw(InvalidPurchaseException);
});

test("the TicketService should throw InvalidPurchaseException given only child seats are booked", () => {
  const ticketService = new TicketService();
  expect(() =>
    ticketService.purchaseTickets(validAccountId, { CHILD: 3 })
  ).to.throw(InvalidPurchaseException);
});

test("the TicketService should throw InvalidPurchaseException given there are more infants than adults", () => {
  const ticketService = new TicketService();
  expect(() =>
    ticketService.purchaseTickets(validAccountId, { ADULT: 1, INFANT: 2 })
  ).to.throw(InvalidPurchaseException);
});

test("that the TicketService allows a good transaction through", () => {
  const ticketService = new TicketService();
  expect(
    ticketService.purchaseTickets(validAccountId, {
      ADULT: 2,
      CHILD: 1,
      INFANT: 1,
    })
  ).to.not.throw;
});
