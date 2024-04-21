const API_BASE_URL = "https://pokeapi.co/api/v2";

async function fetchData(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    return null;
  }
}

export async function fetchPokemonTypes() {
  return fetchData(`${API_BASE_URL}/type`);
}

export async function fetchPokemonList(apiUrl: string) {
  return fetchData(apiUrl);
}
