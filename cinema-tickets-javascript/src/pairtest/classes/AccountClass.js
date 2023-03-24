import { MIN_ACCOUNT_ID } from "../config/Constants.js";

export default class Account {
  #accountId;

  /**
   * Constructor for the Account class
   * @see this.#setAccountId
   */
  constructor(accountId) {
    this.#setAccountId(accountId);
  }

  /**
   * Validates the accountId passed check it meets the 'All accounts with an id greater than zero are valid'
   * assumption
   *
   * @param {number} accountId - The account number to validate
   * @throws {TypeError|RangeError} - If the account number fails validation
   */
  #setAccountId = (accountId) => {
    if (isNaN(accountId))
      throw new TypeError(`Invalid AccountId (${accountId})`);
    else if (accountId <= MIN_ACCOUNT_ID)
      throw new RangeError(`Invalid AccountId (${accountId})`);

    this.#accountId = accountId;
  };

  /**
   * Accessor function for the accountID
   * @returns { number } - The account Id
   */
  getAccountId = () => {
    return this.#accountId;
  };
}
