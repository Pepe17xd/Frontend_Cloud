import {apiClient} from "../../../core/api/apiClient";

export const cinemaApi={
 createRoom:(movieId:string)=>apiClient.post("/rooms",{movieId})
};