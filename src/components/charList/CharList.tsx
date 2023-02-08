import React, {useEffect, useState} from "react";
import './charList.scss';
import {getAllCharacters} from "../../services/MarvelService";

export const CharList = () => {
  const [characterList, setCharacterList] = useState({} as ICharacterList);
  const [offset, setOffset] = useState(9);

  const getCharacters = async () => {
    await getAllCharacters(0)
      .then(data => {
        if (data) {
          setCharacterList(data);
        }
      })
  };

  useEffect(() => {
    getCharacters()
  }, []);

  const loadMore = async () => {
    setOffset(prevState => prevState + 9);

    await getAllCharacters(offset)
      .then(data => {
        if (data) {
          setCharacterList((prevState: ICharacterList) => {
            return {
              ...prevState,
              data: [...prevState.data, ...data.data]
            }
          })
        }
      })
      .catch(error => console.log(error))
  };

  return (
    <div className="char__list">
      <ul className="char__grid">
        {characterList.data && characterList.data.map((item) => <CharItem key={item.id} thumbnail={item.thumbnail} name={item.name} selected={false}/>)}
      </ul>
      <button type="button" className="button button__main button__long" onClick={loadMore}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
};

interface CharItemProps {
  thumbnail: string;
  name: string;
  selected: boolean;
}

const CharItem: React.FC<CharItemProps> = ({thumbnail, name, selected}) => {

  return (
    <li className={"char__item" + `${selected ? " char__item_selected" : ""}`}>
      <img src={thumbnail} alt="abyss"/>
      <div className="char__name">{name}</div>
    </li>
  )
};