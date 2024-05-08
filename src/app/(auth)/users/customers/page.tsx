'use client';

import { useNavigation, useInfiniteList } from '@refinedev/core';
import { FilterUserDto, FilterUserDtoRolesEnum, User } from '@techcell/node-sdk';
import { useState } from 'react';

const filters: FilterUserDto = {
  roles: [FilterUserDtoRolesEnum.Customer],
};

export default function CustomerList() {
  const { edit, show } = useNavigation();
  const [pageSize, setPageSize] = useState(5);

  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteList<User>({
      resource: 'users',
      pagination: {
        pageSize: pageSize,
      },
      filters: filters as any,
    });

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  const allPages: User[] = ([] as User[]).concat(...(data?.pages ?? []).map((page) => page.data));

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <label htmlFor="view-per-page" className="mr-2">
          View per page:
        </label>
        <select
          id="view-per-page"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="rounded border-gray-300"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <table className="table-auto border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">No.</th>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPages.map(({ _id, email, role }, index) => (
            <tr key={_id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{_id}</td>
              <td className="border border-gray-300 px-4 py-2">{email}</td>
              <td className="border border-gray-300 px-4 py-2">{role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => edit('customers', _id)}
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => show('customers', _id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Show
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
