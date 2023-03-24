/**
 * Immutable Object.
 */

import {
  MAX_TICKETS_PER_TRANSACTION,
  COST_BY_TICKET_TYPE,
} from "../config/Constants.js";

export default class TicketTypeRequest {
  #type;

  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new TypeError(
        `type must be ${this.#Type
          .slice(0, -1)
          .join(", ")}, or ${this.#Type.slice(-1)}`
      );
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError("noOfTickets must be an integer");
    } else if (noOfTickets < 0 || noOfTickets > MAX_TICKETS_PER_TRANSACTION)
      throw new RangeError(
        `noOfTickets must be between 0 and ${MAX_TICKETS_PER_TRANSACTION}`
      );

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  /**
   * If this ticketType requires a seat then return true otherwise return false
   * @returns { boolean } - True | False
   */
  needSeatForTicketType() {
    return this.#type !== "INFANT";
  }

  /**
   * Calculate the cost of TicketTypeRequest using the values in COST_BY_TICKET_TYPE
   * @returns { number } - the noOfTickets * cost_by_ticket_type
   */
  calculateCost() {
    return this.#noOfTickets * COST_BY_TICKET_TYPE[this.#type];
  }

  #Type = ["ADULT", "CHILD", "INFANT"];
}
