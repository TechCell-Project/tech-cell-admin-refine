'use client';

import { useNavigation, useInfiniteList } from '@refinedev/core';
import { FilterUserDto, User, FilterUserDtoRolesEnum } from '@techcell/node-sdk';

const filters: FilterUserDto = {
  roles: [
    FilterUserDtoRolesEnum.Sales,
    FilterUserDtoRolesEnum.Manager,
    FilterUserDtoRolesEnum.Warehouse,
  ],
};

export default function StaffList() {
  const { edit, show, create } = useNavigation();

  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteList<User>({
      resource: 'users',
      pagination: {
        pageSize: 8,
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
    <div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPages.map(({ _id, email, role }, index) => (
            <tr key={_id}>
              <td>{index + 1}</td>
              <td>{_id}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>
                <button onClick={() => edit('staffs', _id)}>Edit</button>
                {'  '}
                <button onClick={() => show('staffs', _id)}>Show</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
