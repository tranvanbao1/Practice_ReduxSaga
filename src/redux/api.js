import axios from "axios";

const YOUR_APP_ID = "05be53fe";
const YOUR_APP_KEY = "abf3dd3f27678eefce849cefbc48aa0c";

export const getRecipes = async (query) => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
  return await axios.get(url);
};
