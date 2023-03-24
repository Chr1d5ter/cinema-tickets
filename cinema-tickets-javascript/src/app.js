import TicketService from "./pairtest/TicketService.js";

const ts = new TicketService();

try {
  ts.purchaseTickets(10000001, { ADULT: 2, CHILD: 0, INFANT: 0 });
  console.log("Transaction completed succesfully, enjoy the show!");
} catch (error) {
  console.log(error.message);
}
