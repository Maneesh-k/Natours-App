/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_live_51J5mUUSGRRMcwQbcM9xKfx4Gk6kq5webXAUl8sVlUffmoinrZZ3NytANkphbeCawE7UQ11Og5O0ssY3p1d5ubGhr00btKJYrRq');

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
