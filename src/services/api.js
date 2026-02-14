const BASE_URL = 'https://api.jikan.moe/v4';

export const getTopOnaAnime = async () => {
    try {
        const response = await fetch(`${BASE_URL}/top/anime?type=ona`);
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        const data = await response.json();
        return data.data; // Jikan returns { data: [], pagination: {} }
    } catch (error) {
        console.error("Error fetching top ONAs:", error);
        throw error;
    }
};

export const getAnimeDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/anime/${id}`);
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching details for ID ${id}:`, error);
        throw error;
    }
};
