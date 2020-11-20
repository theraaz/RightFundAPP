import React, { useMemo } from "react";
import { useStripe, useElements, IbanElement } from "@stripe/react-stripe-js";


const useOptions = () => {
  const options = useMemo(
    () => ({
      supportedCountries: ["SEPA"],
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
  );

  return options;
};

const IbanForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "sepa_debit",
      sepa_debit: elements.getElement(IbanElement),
      billing_details: {
        name: event.target.name.value,
        email: event.target.email.value
      }
    });

    const iban = elements.getElement(IbanElement);

    const result = await stripe.createToken({
        pii: {id_number: paymentMethod.id},
      });

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" placeholder="Jane Doe" required />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          placeholder="jane.doe@example.com"
          required
        />
      </label>
      <label>
        IBAN
        <IbanElement
          options={options}
        />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default IbanForm;
