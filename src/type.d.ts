declare interface ICharacterResponse {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: [
    {
      url: string;
      type: string;
    },
    {
      url: string;
      type: string;
    }
  ];
  comics: {
    available: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      }
    ];
  }
}

declare interface ICharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
  comics: [
    {
      resourceURI: string;
      name: string;
    }
  ];
}

declare interface ICharacterList {
  data: ICharacter[];
  limit: number;
  offset: number;
  total: number;
}