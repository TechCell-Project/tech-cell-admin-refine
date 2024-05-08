'use client';

import { useNavigation, useResourceParams, useShow } from '@refinedev/core';
import { User } from '@techcell/node-sdk';

export default function StaffShow() {
  const { edit, list } = useNavigation();
  const { id } = useResourceParams();
  const { queryResult } = useShow<User>({ id, resource: 'users' });
  const { data } = queryResult;

  const record = data?.data;

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Staff Details</h1>
        <div className="flex gap-2">
          <button
            onClick={() => list('staffs')}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors duration-200"
          >
            Back to List
          </button>
          <button
            onClick={() => edit('staffs', id ?? '')}
            className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition-colors duration-200"
          >
            Edit Staff
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mt-2">
          <h5 className="font-bold text-gray-600">ID</h5>
          <div className="text-gray-700">{record?._id ?? ''}</div>
        </div>
        <div className="mt-2">
          <h5 className="font-bold text-gray-600">Email</h5>
          <div className="text-gray-700">{record?.email}</div>
        </div>
        <div className="mt-2">
          <h5 className="font-bold text-gray-600">Role</h5>
          <div className="text-gray-700">{record?.role}</div>
        </div>
        <div className="mt-2">
          <h5 className="font-bold text-gray-600">Full Name</h5>
          <div className="text-gray-700">{record?.firstName + ' ' + record?.lastName}</div>
        </div>
      </div>
    </div>
  );
}
