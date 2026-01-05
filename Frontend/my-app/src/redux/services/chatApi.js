import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
    reducerPath:"aiApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/chat",
    }),
    endpoints:(builder)=>({
        generateQuestions:builder.mutation({
            query:(data)=>({
                url:"/generate-questions",
                method:"POST",
                body:data,
            })
        })
    })
})

export const {useGenerateQuestionsMutation} = chatApi;