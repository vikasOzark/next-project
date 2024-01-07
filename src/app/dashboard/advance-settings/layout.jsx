import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <div className="">
        <div className="border border-gray-700 rounded-lg p-3">
          <Link
            href={`/dashboard/advance-settings/department`}
            className="bg-blue-600 rounded-md text-white px-3 py-1"
          >
            Department
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
