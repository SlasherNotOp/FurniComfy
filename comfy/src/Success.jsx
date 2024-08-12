import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ThankYou from './ThankYou';

const Success = () => {

    const{ userId}= useParams();


    const [searchParams] = useSearchParams(); // Query parameters

  const razorpayPaymentId = searchParams.get('razorpay_payment_id');
  const razorpayPaymentLinkId = searchParams.get('razorpay_payment_link_id');
  const razorpayPaymentLinkReferenceId = searchParams.get('razorpay_payment_link_reference_id');
  const razorpayPaymentLinkStatus = searchParams.get('razorpay_payment_link_status');
  const razorpaySignature = searchParams.get('razorpay_signature');


  return (
   <div>
    {/* <h1>Payment Success</h1>
      <p>User ID: {userId}</p>
      <p>Razorpay Payment ID: {razorpayPaymentId}</p>
      <p>Razorpay Payment Link ID: {razorpayPaymentLinkId}</p>
      <p>Razorpay Payment Link Reference ID: {razorpayPaymentLinkReferenceId}</p>
      <p>Razorpay Payment Link Status: {razorpayPaymentLinkStatus}</p>
      <p>Razorpay Signature: {razorpaySignature}</p> */}

      <div>
      <ThankYou/>

      </div>
   </div>
  )
}

export default Success
