const API_KEY = process.env.REACT_APP_API_KEY;
const url = new URL(`https://gateway.marvel.com:443/v1/public`);

const getResource = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`could not fetch ${url}, status ${response.status}`)
  } else return response.json();
};

export const getAllCharacters = async () => {
  const res = await getResource(`${url}/characters?limit=2&offset=4&apikey=${API_KEY}`);
  return res.data.results.map((item: ICharacter) => _transformCharacter(item))
};

export const _transformCharacter = (character: ICharacter) => {
  return {
    name: character.name,
    description: character.description,
    thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    homepage: character.urls[0].url,
    wiki: character.urls[1].url
  }
};

export const getCharacter = async (id: number) => {
  const res = await getResource(`${url}/characters/${id}?apikey=${API_KEY}`);
  console.log(res.data.results[0]);
  return _transformCharacter(res.data.results[0]);
};
