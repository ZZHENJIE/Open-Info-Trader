// import { CreateApiResponse } from "../APIType";

// export default defineEventHandler(async (event) => {
//     const query = getQuery(event);
//     const url = `https://www.futunn.com/search-stock/predict?lang=${query.lang}&keyword=${query.keyword}`;

//     return fetch(url).then(response => {
//         if(response.ok){
//             return response.json().then(json => {
//                 return CreateApiResponse(response,'success',json.data)
//             })
//         }
//         return CreateApiResponse(response,'error',null)
//     })
// });

