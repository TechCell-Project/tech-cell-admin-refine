"use client";

import axiosInstance from "@lib/axios";
import { CrudSort, DataProvider, Pagination } from "@refinedev/core";

function handlePagination(
  searchParams: URLSearchParams,
  pagination?: Pagination
) {
  const { current = 1, pageSize = 10 } = pagination ?? {};
  searchParams.set("page", String(current));
  searchParams.set("limit", String(pageSize));
  return searchParams;
}

function handleFilter(searchParams: URLSearchParams, filters?: Object) {
  if (!filters) {
    return searchParams;
  }

  searchParams.set("filter", JSON.stringify(filters));
  return searchParams;
}

function handleSort(searchParams: URLSearchParams, sorters?: CrudSort[]) {
  if (!sorters) {
    return searchParams;
  }

  const sortersMap = sorters.map((sorter) => {
    return {
      orderBy: sorter.field,
      order: sorter.order,
    };
  });

  searchParams.set("sort", JSON.stringify(sortersMap));
  return searchParams;
}

const apiUrl = "https://api.techcell.cloud/api";

export const dataProvider: Omit<
  Required<DataProvider>,
  "getMany" | "createMany" | "updateMany" | "deleteMany"
  //   | "getOne"
  //   | "create"
  //   | "update"
  //   | "deleteOne"
> = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}`;

    let searchParams = new URLSearchParams();

    searchParams = handlePagination(searchParams, pagination);
    searchParams = handleFilter(searchParams, filters);
    searchParams = handleSort(searchParams, sorters);

    const { data } = await axiosInstance.get(`${url}?${searchParams}`);

    // without pagination
    if (Array.isArray(data)) {
      return {
        data,
        total: data.length,
      };
    }
    // with pagination
    return {
      data: data.data,
      total: data.total,
    };
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await axiosInstance.get(url);
    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await axiosInstance.put(url, variables);
    return { data };
  },
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await axiosInstance.post(url, variables);
    return { data };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await axiosInstance.delete(url);
    return { data };
  },
  getApiUrl: () => {
    return apiUrl;
  },
  custom: async ({
    url,
    method,
    meta,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let searchParams = new URLSearchParams();

    searchParams = handleFilter(searchParams, filters);
    searchParams = handleSort(searchParams, sorters);

    let requestUrl = `${url}?${searchParams}`;

    if (query) {
      requestUrl = `${requestUrl}&${JSON.stringify(query) ?? query.toString()}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await axiosInstance[method](url, payload, {
          headers,
        });
        break;
      case "delete":
        axiosResponse = await axiosInstance.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      case "get":
      default:
        axiosResponse = await axiosInstance.get(requestUrl, { headers });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
};
