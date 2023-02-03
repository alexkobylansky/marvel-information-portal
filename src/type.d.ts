declare interface ICharacterResponse {
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
}

declare interface ICharacter {
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
}

declare interface ViewProps {
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
  imageNotFound: boolean
}