// ...existing code...
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Authentication/useAuth';
import './CheckoutForm.css';

const CheckoutForm = ({ course }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate();

  // Default fallback values
  const price = course?.price || 25;
  const { name, _id, courseId } = course || {};

  useEffect(() => {
    if (price > 0) {
      fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price }),
      })
        .then(res => res.json())
        .then(data => {
          setClientSecret(data.clientSecret);
        })
        .catch(err => console.error('Error creating payment intent:', err));
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      return;
    } else {
      setCardError('');
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'unknown',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.error(confirmError);
      setProcessing(false);
      return;
    }

    setProcessing(false);

    if (paymentIntent?.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      const paymentData = {
        transactionId: paymentIntent.id,
        email: user?.email,
        price,
        date: new Date(),
        className: name,
        classId: _id,
        course: courseId,
      };

      try {
        const res = await fetch('http://localhost:3000/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const data = await res.json();

        // Server returns insertResult/... — navigate when the request succeeded
        const inserted = data?.insertResult?.acknowledged || data?.insertResult?.insertedId;
        if (res.ok && (inserted || res.status === 200)) {
          navigate('/admission-form', { state: { payment: paymentData, course } });
        } else {
          // fallback: still navigate but log warning (optional)
          console.warn('Payment saved but unexpected server response:', data);
          navigate('/admission-form', { state: { payment: paymentData, course } });
        }
      } catch (error) {
        console.error('Error saving payment info:', error);
        // still navigate so user can finish admission (optional)
        navigate('/admission-form', { state: { payment: paymentData, course } });
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-xl mt-20">
      <h2 className="text-2xl font-semibold text-center  text-purple-700">Pay ${price}</h2>

      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
          className="border border-gray-300 rounded-md p-3"
        />

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className={`w-full mt-6 rounded-lg font-semibold transition-all duration-300 ${
            processing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {processing ? 'Processing...' : `Pay $${price}`}
        </button>
      </form>

      {cardError && <p className="text-red-600 text-center mt-4">{cardError}</p>}
      {transactionId && (
        <p className="text-green-600 text-center mt-4">
          ✅ Transaction complete! ID: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;