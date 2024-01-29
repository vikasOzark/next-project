import BillingTable from "./component/BillingTable";

export default function BillingPage() {
  return (
    <div>
      <h2 className="text-4xl mb-5 text-gray-200 font-extrabold">Billing</h2>
      <p className="text-gray-400 text-lg">Manage your billing and payments.</p>

      <div className="flex mt-5">
        <div className="w-[80%]">
          <div className="">
            <h2 className="text-2xl font-extrabold text-gray-200">History</h2>
            <p className="text-gray-400">
              Manage billing information and view recept.
            </p>
          </div>
          <div className=" mt-2">
            <BillingTable />
          </div>
        </div>

        <div className="">
          <div className="m-2 shadow rounded-xl p-7 soft-bg w-[20rem]">
            <div className="text-2xl text-white font-bold">Your plan</div>
            <div className="text-md font-bold  text-gray-200 mt-1">
              Starter ( monthly )
            </div>
            <div className="text-md text-gray-200">24/01/2024</div>
            <div className="mt-2">
              <button className="bg-blue-600 text-white w-100 rounded-full px-5 font-bold text-lg py-1">
                Change plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
