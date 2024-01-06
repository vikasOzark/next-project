export default function Layout({ children }) {
  return (
    <>
      <div className="">
        <div className="border border-gray-700 rounded-lg p-3">
          <button className="bg-blue-600 rounded-md text-white px-3 py-1">
            Department
          </button>
        </div>
      </div>
      {children}
    </>
  );
}
