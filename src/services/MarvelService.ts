const API_KEY = process.env.REACT_APP_API_KEY;
const url = new URL(`https://gateway.marvel.com:443/v1/public`);

const getResource = async (url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    return response
  } else throw new Error(`Could not fetch ${url}, status: ${response.status}`);
};

export const getAllCharacters = async (offset: number) => {
  const response = await getResource(`${url}/characters?limit=9&offset=${offset}&apikey=${API_KEY}`);
  if (response.ok) {
    const data = await response.json();
    return {
      data: data.data.results.map((character: ICharacterResponse) => _transformCharacter(character)),
      total: data.data.total,
      offset: data.data.offset,
      limit: data.data.limit
    }
  } else return null
};

export const _transformCharacter = (character: ICharacterResponse): ICharacter => {
  return {
    id: character.id,
    name: character.name,
    description: character.description,
    thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    homepage: character.urls[0].url,
    wiki: character.urls[1].url,
    comics: character.comics.items
  }
};

export const getCharacter = async (id: number) => {
  const response = await getResource(`${url}/characters/${id}?apikey=${API_KEY}`);
  if (response.ok) {
    const data = await response.json();
    return _transformCharacter(data.data.results[0]);
  } else return null
};