import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      headers.set("accept", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    placeOrder: builder.mutation({
      query: (product_id) => ({
        url: "/orders",
        method: "POST",
        body: { product_id },
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} = Api;
