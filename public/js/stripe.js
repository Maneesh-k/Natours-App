/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('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');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
