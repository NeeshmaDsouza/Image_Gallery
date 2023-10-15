import { v4 as uuid } from "uuid";

export const appConfig = {
    indexDBStores: [
      {
        name: "imageList",
        key: "id",
        indices: []
      }
    ],
    initialImages: [{
        id: uuid(),
        title: "River",
        description: 'River and Mountaind',
        animation: 'shake',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/2189700/pexels-photo-2189700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },{
        id: uuid(),
        title: "Sea",
        description: 'Ship and Sea',
        animation: 'fadeIn',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },{
        id: uuid(),
        title: "Wheel",
        description: 'Yellow wheel',
        animation: 'transform',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/16665616/pexels-photo-16665616/free-photo-of-potted-plants-and-wheels-in-a-store.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: uuid(),
        title: "Plant",
        description: 'Green Plant iun a White pot',
        animation: 'colourize',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/1777813/pexels-photo-1777813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2https://images.pexels.com/photos/1777813/pexels-photo-1777813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2https://images.pexels.com/photos/1777813/pexels-photo-1777813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: uuid(),
        title: "Grass",
        description: 'Green and wet grass',
        animation: 'shake',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/1089450/pexels-photo-1089450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: uuid(),
        title: "Decor",
        description: 'Modern Decor',
        animation: 'transform',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/4558718/pexels-photo-4558718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }]
  };
  