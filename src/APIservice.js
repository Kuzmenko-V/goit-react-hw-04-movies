const BASE_URL = "https://api.themoviedb.org/3";
const KEY = 'c989c5f6813aea0ca3cd48dd1eb3c42e';

const API = async function (param, page , query ) {
    let text = `${BASE_URL}${param}?api_key=${KEY}`;
    page && (text += `&page=${page}`);
    query && (text += `&query=${query}`);
    const response = await fetch(text);
    return response.json();
}
export default API;