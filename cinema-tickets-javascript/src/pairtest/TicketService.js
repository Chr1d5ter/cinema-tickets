import AccountClass from "./classes/AccountClass.js";
import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import { MAX_TICKETS_PER_TRANSACTION } from "./config/Constants.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

export default class TicketService {
  /**
   * This validator will create an array of TicketTypes and return it or throw an error if an invalid
   * TicketType is passed. This ensures the whole transaction fails.
   *
   * @param {*} ticketTypeRequests
   * @throws { RangeError | TypeError } - if a TicketType is not valid one of these will be thrown
   * @returns { Array } - Array of TicketTypeRequests
   */
  #validateTicketTypes(ticketTypeRequests) {
    // first iterate through each ticketTypeRequests to make sure it matches the valid ones
    const passedInTicketTypes = ticketTypeRequests[0];
    const requiredTickets = [];

    for (const index in passedInTicketTypes) {
      const numberOfTickets = passedInTicketTypes[index];
      const ticketRequest = new TicketTypeRequest(index, numberOfTickets);
      requiredTickets.push(ticketRequest);
    }

    return requiredTickets;
  }

  /**
   * This function will make sure that the transaction is valid and if so will ensure everything gets called
   * correctly.
   *
   * @param {Array} requiredTickets - An array of ticketTypeRequests
   * @return {object} an object that represents the transaction
   */
  #validateTransaction(requiredTickets) {
    const transactionSummary = {
      totalCost: 0,
      totalNumberOfTicketsUsed: 0,
      numberOfAdultTicketsPurchased: 0,
      numberOfInfantTicketsPurchased: 0,
    };

    for (const index in requiredTickets) {
      const ticketType = requiredTickets[index];
      const numberOfticketsForThisType = ticketType.getNoOfTickets();

      if ("ADULT" === ticketType.getTicketType())
        transactionSummary.numberOfAdultTicketsPurchased +=
          numberOfticketsForThisType;
      else if ("INFANT" === ticketType.getTicketType())
        transactionSummary.numberOfInfantTicketsPurchased +=
          numberOfticketsForThisType;

      if (ticketType.needSeatForTicketType())
        transactionSummary.totalNumberOfTicketsUsed +=
          numberOfticketsForThisType;

      transactionSummary.totalCost += ticketType.calculateCost();
    }

    // Check to make sure we haven't exceeded the total amount of bums on seats per transaction.
    if (
      transactionSummary.totalNumberOfTicketsUsed > MAX_TICKETS_PER_TRANSACTION
    )
      throw new RangeError(
        `noOfTickets must be between 1 and ${MAX_TICKETS_PER_TRANSACTION}. This transaction has ${
          transactionSummary.numberOfAdultTicketsPurchased
        } ADULT and ${
          transactionSummary.totalNumberOfTicketsUsed -
          transactionSummary.numberOfAdultTicketsPurchased
        } CHILD ticket types`
      );

    // now lets check to make sure we have at least one adult in the group
    if (transactionSummary.numberOfAdultTicketsPurchased <= 0)
      throw new InvalidPurchaseException(
        `There must be at least one Adult to accompany any children or infants`
      );

    // finally lets check to see that we have the correct ratio of infants to adults
    if (
      transactionSummary.numberOfInfantTicketsPurchased >
      transactionSummary.numberOfAdultTicketsPurchased
    )
      throw new InvalidPurchaseException(
        `You cannot purchase more infant (${transactionSummary.numberOfInfantTicketsPurchased}) than adult (${transactionSummary.numberOfAdultTicketsPurchased}) ticket types`
      );

    return transactionSummary;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    try {
      const customerAccount = new AccountClass(accountId);
      const requiredTickets = this.#validateTicketTypes(ticketTypeRequests);
      const transactionSummary = this.#validateTransaction(requiredTickets);

      // Now we have everything to call the APIs that we have been told have no defects, and always work
      // Normally I'd call these services asynchronously ( async/await ) with a try/catch block to catch any errors
      new SeatReservationService().reserveSeat(
        customerAccount.getAccountId(),
        transactionSummary.totalNumberOfTicketsUsed
      );

      new TicketPaymentService().makePayment(
        customerAccount.getAccountId(),
        transactionSummary.totalCost
      );
    } catch (error) {
      // this could do with being logged in and pushed to logstash or whatever
      throw new InvalidPurchaseException(error);
    }
  }
}
