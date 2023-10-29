import { twMerge } from "tailwind-merge";

export const TicketStatusCard = ({
  title,
  data,
  analyticString,
  icon,
  style,
}) => {
  return (
    <>
      <div
        class={twMerge(
          `rounded-xl bg-white ms-2 text-card-foreground shadow`,
          style
        )}
        // style={{ width: "max-content" }}
      >
        <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="tracking-tight text-sm font-medium">{title}</h3>
          {icon}
        </div>
        <div class="p-6 pt-0">
          <div class="text-2xl font-bold">{data}</div>
          <p class="text-xs text-muted-foreground">{analyticString}</p>
        </div>
      </div>
    </>
  );
};

export const TableRow = () => {
  const TABLE_HEADER = [
    "Name",
    "Status",
    "Department",
    "Assigned to",
    "Teams",
    "Edit",
  ];

  return (
    <>
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center gap-x-3">
                      <input
                        type="checkbox"
                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                      />
                      <span>Name</span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Department
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Assigned to
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Teams
                  </th>

                  <th scope="col" className="relative py-3.5 px-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                <TableBodyRow />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const TableBodyRow = () => {
  return (
    <>
      <tr>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <input
              type="checkbox"
              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
            />

            <div className="flex items-center gap-x-2">
              <div>
                <h2 className="font-medium text-gray-800 dark:text-white ">
                  It solution issue
                </h2>
              </div>
            </div>
          </div>
        </td>
        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

            <h2 className="text-sm font-normal text-emerald-500">Active</h2>
          </div>
        </td>
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          Graphic Designer
        </td>
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          mia@example.com
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-2">
            <TaskTag />
          </div>
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-6">
            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>

            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

const TaskTag = () => {
  return (
    <>
      <p className="px-3 py-1 text-xs text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60">
        Marketing
      </p>
    </>
  );
};
