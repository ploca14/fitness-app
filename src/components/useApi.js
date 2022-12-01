import { $fetch } from "ohmyfetch";
import useUser from "./useUser";


export default function useApi() {
    const { token } = useUser();

    const apiFetch = $fetch.create({
        baseURL: 'https://fitnessbackend2022.azurewebsites.net/api',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })

    return {
        apiFetch
    }
}