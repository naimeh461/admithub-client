// ...existing code...
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from '@stripe/stripe-js';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Authentication/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [colleges, setColleges] = useState([]);
    const { id } = useParams();
    const course = colleges.find(colleges => colleges._id === id);
    const navigate = useNavigate();
    // const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        fetch(`http://localhost:3000/admission`)
            .then(res => res.json())
            .then(data => setColleges(data));
    }, []);

    // Wait until colleges are loaded before deciding to redirect
    useEffect(() => {
        if (colleges.length > 0 && !course) {
            navigate('/admission');
        }
    }, [colleges, course, navigate]);

    return (
        <div className="w-[70%] mx-auto mb-auto">
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm course={course}  />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
// ...existing code...