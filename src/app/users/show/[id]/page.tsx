'use client';

import { useNavigation, useResourceParams, useShow } from '@refinedev/core';
import { User } from '@techcell/node-sdk';

export default function CategoryShow() {
  const { edit, list } = useNavigation();
  const { id } = useResourceParams();
  const { queryResult } = useShow<User>({});
  const { data } = queryResult;

  const record = data?.data;

  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Show</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => list('users')}>List</button>
          <button onClick={() => edit('users', id ?? '')}>Edit</button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: '6px' }}>
          <h5>ID</h5>
          <div>{record?._id ?? ''}</div>
        </div>
        <div style={{ marginTop: '6px' }}>
          <h5>Email</h5>
          <div>{record?.email}</div>
        </div>
        <div style={{ marginTop: '6px' }}>
          <h5>Role</h5>
          <div>{record?.role}</div>
        </div>
        <div style={{ marginTop: '6px' }}>
          <h5>Full Name</h5>
          <div>{record?.firstName + ' ' + record?.lastName}</div>
        </div>
      </div>
    </div>
  );
}
