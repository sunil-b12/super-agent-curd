import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const superAgentApi = createApi({
    reducerPath: "superAgentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://testing.esnep.com/happyhomes/api/'
    }),
    tagTypes: ["allSuperAgent"],

    endpoints: (builder) => ({

        getSuperAgent: builder.query({
            query: (q) => ({
                url: 'admin/agent',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Signature": "p0m76",
                },
                body: JSON.stringify({
                    AuthCode: "r1d3r",
                    Flag: "S",
                    UserID: "-1",
                    IsActive: "-1",
                    AllowApp: "-1"
                })
            }),
            providesTags: ["allSuperAgent"],
        }),

        getSuperAgentById: builder.query({
            query: (agentId) => {
                if (agentId !== null) {
                    return {
                        url: 'admin/agent',
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Signature": "p0m76",
                        },
                        body: {
                            AuthCode: "r1d3r",
                            Flag: "SI",
                            AgentID: agentId.toString() // Convert agentId to string
                        }
                    };
                }
            },
            invalidatesTags: ["allSuperAgent"],
        }),
        deleteSuperAgent: builder.mutation({
            query: (agentId) => ({
                url: 'admin/agent',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Signature": "p0m76",
                },
                body: JSON.stringify({
                    AuthCode: "r1d3r",
                    Flag: "R",
                    AgentID: agentId.toString() // Convert agentId to string
                })
            }),
            invalidatesTags: ["allSuperAgent"],
        }),

        createSuperAgent: builder.mutation({
            query: (formData) => {
                return {
                    url: 'admin/agent',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Signature": "p0m76",
                    },
                    body: formData,

                }
            },
            invalidatesTags: ["allSuperAgent"],

        }),

        updateSuperAgent: builder.mutation({
            query: (query) => ({
                url: 'admin/agent',
                body: JSON.stringify(query.body),
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Signature": "p0m76",
                },
            }),
            invalidatesTags: ["allSuperAgent"],
        }),

        isActive: builder.mutation({
            query: (query) => ({
                url: 'admin/agent',
                body: query.body,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Signature": "p0m76",
                },
            }),
            invalidatesTags: ["allSuperAgent"],
        }),

        isAllow: builder.mutation({
            query: (query) => ({
                url: 'admin/agent',
                body: JSON.stringify(query.body),
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Signature": "p0m76",
                },
            }),
            invalidatesTags: ["allSuperAgent"],
        }),

        restPassword: builder.mutation({
            query: (query) => ({
                url: 'admin/agent',
                body: JSON.stringify(query.body),
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Signature": "p0m76",
                },
            }),
            invalidatesTags: ["allSuperAgent"],
        }),

    })

})


export const { useGetSuperAgentQuery, useDeleteSuperAgentMutation, useCreateSuperAgentMutation, useIsActiveMutation, useIsAllowMutation, useUpdateSuperAgentMutation, useGetSuperAgentByIdQuery, useRestPasswordMutation } = superAgentApi