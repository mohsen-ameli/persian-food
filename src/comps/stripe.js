import {CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const CARD_OPTIONS = {
  iconStyle: "solid",
	style: {
		base: {
			// iconColor: "#ef4444",
			color: "#000000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#ef4444" },
			// "::placeholder": { color: "#ef4444" }
		},
	}
}

const CheckoutForm = () => {
  return (
    <form>
      <fieldset className="bg-red-200 p-4 rounded-lg">
        <CardElement options={CARD_OPTIONS} />
      </fieldset>
    </form>
  );
};

const STRIPE_KEY = 'pk_test_51Kc1UjAr82IgvHHyBuJyRlRZLVxiiIsFKEqdEZTr5Lbo9Dy1xwP90QwZhU46FkwS65CfbnO197fSHHQEkT75Vl8800k1apJpXs'

const stripePromise = loadStripe(STRIPE_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default Stripe