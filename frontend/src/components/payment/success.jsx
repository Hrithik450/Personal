import { CheckCircle } from "lucide-react";

const PaymentSuccess = ({ amount }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg w-full min-h-[478px]">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute w-40 h-40 bg-green-100 rounded-full"></div>
        <div className="absolute w-36 h-36 bg-green-200 rounded-full"></div>
        <div className="absolute w-32 h-32 bg-green-300 rounded-full flex items-center justify-center">
          <CheckCircle className="text-green-500 w-18 h-18" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 text-gray-800 text-center">
        Congrats, Payment Successful!
      </h2>
      <p className="text-xl text-gray-600 mt-2 text-center">
        You Can Return To Your Terminal Now!
      </p>

      <hr className="w-full border-gray-300 my-3" />

      <p className="text-xl text-gray-700">
        Amount paid{" "}
        <span className="text-blue-500 font-semibold">₹{amount}</span>
      </p>
    </div>
  );
};

export default PaymentSuccess;
