export default function Dashboard() {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-500 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Card 1</h2>
          <p>Card content goes here...</p>
        </div>
        <div className="bg-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Card 2</h2>
          <p>Card content goes here...</p>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
}
