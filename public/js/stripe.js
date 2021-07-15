/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import Stripe from 'stripe';
const stripe =new Stripe('pk_test_51J5mUUSGRRMcwQbcvI1jAPZ5u0le5f4as1GRD3ZCnteiOBOJU2nN2Ouw2f5qPsUYKiCeRqWyGTZ5eTRzzr7h8Vhf00U3IT6ATv', {
  apiVersion: '2020-08-27',
});

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
