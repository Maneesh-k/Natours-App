/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('sk_test_51J5mUUSGRRMcwQbcwv9vjHKUuI7sGYC781jr6OMzWcBo6VK2yKPaxVD60RtZkMjPOQsuRQxl9q6OK5unmjZhQuOw0079eaOJxe');

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
