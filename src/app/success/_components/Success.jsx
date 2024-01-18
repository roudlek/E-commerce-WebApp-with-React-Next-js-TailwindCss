export default function Success(){
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold mb-4">Order Successful!</h1>
        <p className="text-lg mb-4">
          Your order has been successfully placed.
        </p>
        <p className="text-sm text-gray-500">
          Check your inbox for further details.
        </p>
        {/* You can add more details or actions based on your requirements */}
      </div>
    )
}