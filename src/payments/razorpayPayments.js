const Razorpay = require("razorpay");

const config = {
  key_secret: process.env.RAZORPAY_SECRET_KEY,
  key_id: process.env.RAZORPAY_KEY_ID_TEST,
};

class Payments {
  constructor({ userId, currency = "inr" }) {
    (this.userId = userId),
      (this.currency = currency),
      (this.receipt = receipt),
      (this.note = note),
      (this.instance = new Razorpay(config));
  }

  /**
   *  This method is use to create payment on the server
   * @param {Number} amount Amount of the order
   * @param {String} note Note
   * @param {CallableFunction} fallback handler function to handle the response
   */
  createPayment({ amount, note = "", fallback }) {
    const order_params = {
      amount,
      receipt: this.userId,
      note,
    };
    this.instance.orders.create(order_params, fallback);
  }
}

export default Payments;
