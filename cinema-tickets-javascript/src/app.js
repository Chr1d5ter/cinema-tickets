import TicketService from "./pairtest/TicketService.js";

const ts = new TicketService();

const transactions = [
  { ADULT: 2 }, // valid
  { ADULT: 2, CHILD: 2, INFANT: 2 }, // valid
  { ADULT: 10, CHILD: 10, INFANT: 10 }, // valid
  { ADULT: 2, CHILD: 18, INFANT: 2 }, // valid
  { ADULT: 20, CHILD: 1 }, // invalid too many tickets
  { CHILD: 3 }, // invalid - no child tickets without adults
  { ADULT: 1, INFANT: 2 }, // invalid too many infants
  { INFANT: 2 }, // invalid need at least 1 adult
  { accountId: -1, ADULT: 1 }, // invalid negative accountId
  { accountId: "bad_accountd_id", ADULT: 1 }, // invalid accountId
];

transactions.forEach((requiredTickets) => {
  try {
    ts.purchaseTickets(
      requiredTickets.accountId ? requiredTickets.accountId : 1000001,
      requiredTickets
    );
    console.log(`Success - ${JSON.stringify(requiredTickets)}`);
  } catch (error) {
    console.log(
      `Transaction failed - ${JSON.stringify(requiredTickets)}. Reason: ${
        error.message
      }`
    );
  }
});
