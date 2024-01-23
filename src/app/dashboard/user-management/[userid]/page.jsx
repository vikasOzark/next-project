"use client";

import { useQuery } from "react-query";

export default function User({ params }) {
  const { data } = useQuery(
    `user-${params.userid}`,
    async () => {
      const response = await fetch("/api/users/" + params.userid);
      const json_response = await response.json();
      return json_response;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const userData = data?.data || {};

  const department = useQuery(
    [`department`],
    async () => {
      const response = await fetch(
        "/api/departments/" + userData.departmentMemberId
      );
      const json_response = await response.json();
      return json_response;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      staleTime: 0,
      enabled: !!userData.departmentMemberId,
      select: (data) => data.data.name,
    }
  );

  return (
    <>
      <div className="border rounded-xl p-2 mb-2 border-gray-600 text-white">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3 font-bold text-gray-400">
            <p>User Name</p>
            <p className="text-gray-200">
              {userData?.first_name} {userData?.last_name}
            </p>
          </div>
          <div className="col-span-3 font-bold text-gray-400">
            <p>User Email</p>
            <p className="text-gray-200">{userData?.email}</p>
          </div>
          <div className="col-span-3 font-bold text-gray-400">
            <p>User Contact</p>
            <p className="text-gray-200">{userData?.contact_number}</p>
          </div>
          <div className="col-span-3 font-bold text-gray-400">
            <p>User Role</p>
            <p className="text-gray-200">{userData?.role}</p>
          </div>
          <div className="col-span-3 font-bold text-gray-400">
            <p>User Department</p>
            <p className="text-gray-200">{department?.data}</p>
          </div>
        </div>
      </div>
    </>
  );
}
