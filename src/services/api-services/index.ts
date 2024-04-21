const API_BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonTypes() {
  try {
    const response = await fetch(`${API_BASE_URL}/type`);

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
