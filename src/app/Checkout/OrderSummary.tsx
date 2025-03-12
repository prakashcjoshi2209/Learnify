const orderData = {
    originalPrice: 3999,
    discounts: {
      percentage: 85,
      amount: -3400,
    },
    total: {
      amount: 599,
      coursesIncluded: 1,
    },
    promotion: {
      message: "🔥 Tap into Success Now",
      recentEnrolled: 3,
    },
  };
  
  const OrderSummary = () => {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg w-96 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
        
        <div className="mt-4 space-y-2 text-gray-700">
          <p className="flex justify-between">
            <span>Original Price:</span>
            <span className="line-through text-gray-500">₹{orderData.originalPrice}</span>
          </p>
          <p className="flex justify-between text-red-600 font-medium">
            <span>Discounts ({orderData.discounts.percentage}% Off):</span>
            <span>₹{orderData.discounts.amount}</span>
          </p>
          <hr className="border-gray-300 my-3" />
          <p className="flex justify-between font-bold text-lg">
            <span>Total ({orderData.total.coursesIncluded} course):</span>
            <span className="text-green-600">₹{orderData.total.amount}</span>
          </p>
        </div>
  
        {/* Promotion Banner */}
        <div className="mt-5 p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-md">
          <p className="font-semibold text-lg">{orderData.promotion.message}</p>
          <p className="text-sm mt-1">
            Join <strong>{orderData.promotion.recentEnrolled} people</strong> in your country who recently enrolled.
          </p>
        </div>
  
      </div>
    );
  };
  
  export default OrderSummary;
  