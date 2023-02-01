declare interface ICharacter {
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