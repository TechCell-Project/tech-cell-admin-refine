'use client';

import { useLogout, useMenu } from '@refinedev/core';
import Link from 'next/link';

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();

  return (
    <nav className="menu bg-gray-800 text-white w-64 min-h-screen p-6">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.route ?? '/'}
              className={`block py-2.5 px-4 rounded transition duration-200 ${selectedKey === item.key ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() => logout()}
        className="mt-4 py-2 px-4 w-full text-left bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};
