"use client";

import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";

export default function CategoryList() {
  const { edit, show, create } = useNavigation();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "_id",
        header: "ID",
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email",
      },
      {
        id: "role",
        accessorKey: "role",
        header: "Role",
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ row }) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              <button
                onClick={() => {
                  show("users", row.original._id);
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  edit("users", row.original._id);
                }}
              >
                Edit
              </button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    getState,
    setPageIndex,
    getCanPreviousPage,
    getPageCount,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>List</h1>
        <button onClick={() => create("users")}>Create</button>
      </div>
      <div style={{ maxWidth: "100%", overflowY: "scroll" }}>
        <table>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "12px" }}>
        <button
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
          {">"}
        </button>
        <button
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
        >
          {">>"}
        </button>
        <span>
          <strong>
            {" "}
            {getState().pagination.pageIndex + 1} / {getPageCount()}{" "}
          </strong>
        </span>
        <span>
          | Go:{" "}
          <input
            type="number"
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
          />
        </span>{" "}
        <select
          value={getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
