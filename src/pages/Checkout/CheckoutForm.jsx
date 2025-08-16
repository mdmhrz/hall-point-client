import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CheckoutForm = ({ price, selectedPlan }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [cardComplete, setCardComplete] = useState(false);

    const amount = price;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)

        if (!card) {
            return
        }


        //Step-1: Validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setError(error.message)
        }
        else {
            setError('')
            console.log('Payment Method', paymentMethod);

            // Setp:2 create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
            })

            const clientSecret = res.data.clientSecret;


            //Step-3: Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                setError(result.error.message)
                setLoading(false)
            }
            else {
                setError('')
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment Succeeded');
                    console.log(result);
                    const transactionId = result.paymentIntent.id


                    //Step-4: marked parcel paid also create payment history
                    const membershipData = {
                        name: user.displayName,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types,
                        badge: selectedPlan
                    }

                    const membershipRes = await axiosSecure.post(`/payments`, membershipData);
                    if (membershipRes.data.insertdId) {
                        console.log('Payment Successfully done');


                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `
                                <div class="text-left">
                                    <p><strong>Transaction ID:</strong> ${transactionId}</p>
                                    <p>Your payment has been successfully processed.</p>
                                </div>
                            `,
                            confirmButtonText: 'Go to Dashboard?',
                            confirmButtonColor: '#22c55e',
                            allowOutsideClick: false,
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                setLoading(false)
                                console.log('payment complete');
                                navigate('/dashboard');
                            }
                        });
                    }
                }
            }

            // console.log('res from intent', res);
        }



    }



    return (
        <div className="max-w-md w-full mx-auto bg-white p-6 rounded-xl shadow-lg mt-10 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                Payment for {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Membership
            </h2>

            <div className="mb-4 flex items-center justify-center gap-3 opacity-80">
                <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
                <img src="https://img.icons8.com/color/48/mastercard.png" alt="MasterCard" className="h-8" />
                <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-8" />
                <img src="https://img.icons8.com/color/48/discover.png" alt="Discover" className="h-8" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Card Details</label>
                    <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
                        <CardElement
                            onChange={(event) => setCardComplete(event.complete)}
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#1f2937',
                                        '::placeholder': { color: '#9ca3af' },
                                    },
                                    invalid: { color: '#dc2626' },
                                },

                            }}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <button
                    className={`btn bg-primary border-none ${loading && 'bg-primary/70 cursor-not-allowed'} w-full mt-2`}
                    type="submit"
                    disabled={!stripe || !cardComplete}
                >
                    {loading ? 'Completing Payment...' : `Pay ${amount}`}
                </button>

                <div className="text-xs text-center text-gray-400 mt-3">
                    This payment is encrypted and securely processed via <strong>Stripe</strong>.
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
