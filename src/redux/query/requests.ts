import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const banxicoApi = createApi({
  reducerPath: "banxicoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/",
    prepareHeaders: (headers) => {
      headers.set("authorization", import.meta.env.VITE_API_TUKAN_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSeriesCatalog: builder.query({
      query: (page: number) => `dev/series?page=${page}`,
    }),
    getSeriesData: builder.query({
      query: ({
        series,
        start_date,
        end_date,
      }: {
        series: string;
        start_date: string;
        end_date: string;
      }) => ({
        url: `dev/series/${series}/${start_date}/${end_date}`,
        method: "GET",
        headers: {
          "Bmx-Token": import.meta.env.VITE_API_BANXICO_KEY,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSeriesCatalogQuery, useGetSeriesDataQuery } = banxicoApi;
