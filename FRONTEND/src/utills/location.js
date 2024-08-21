import { BASE_URL } from "./config";


export const getCoords = async (address) => {
    try {
        const response = await fetch(`${BASE_URL}/tours/getCoordinates`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ address: address }),
        });
        const coords = response.json();
        return coords;
    } catch (error) {
        console.log(error.message);
    }
};
