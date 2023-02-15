import React, {useEffect, useState} from "react";
import './charList.scss';
import {Spinner} from "../spinner/Spinner";
import {getAllCharacters} from "../../services/MarvelService";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface CharListProps {
  onCharSelected: (id: number) => void;
  selectedChar: number | null;
}

export const CharList: React.FC<CharListProps> = ({onCharSelected, selectedChar}) => {
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [characterList, setCharacterList] = useState({} as ICharacterList);
  const [offset, setOffset] = useState(9);

  const getCharacters = async () => {
    await getAllCharacters(0)
      .then(data => {
        if (data) {
          setCharacterList(data);
          setLoading(false)
        }
      })
  };

  useEffect(() => {
    getCharacters()
  }, []);

  const loadMoreFunc = async () => {
    setLoadMore(true);
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
          setLoadMore(false);
        }
      })
      .catch(error => console.log(error))
  };

  const spinner = loading ? <Spinner/> : null;
  const content = (!loading && characterList.data) ? characterList.data.map((item) => <CharItem key={item.id} onCharSelected={() => onCharSelected(item.id)} thumbnail={item.thumbnail} name={item.name} selected={selectedChar === item.id}/>) : null

  return (
    <div className="char__list">
      {spinner}
      <ul className="char__grid">
        {content}
      </ul>
      {loadMore && <Spinner/>}
      <button type="button" className="button button__main button__long" onClick={loadMoreFunc}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
};

interface CharItemProps {
  thumbnail: string;
  name: string;
  selected: boolean;
  onCharSelected: () => void
}

const CharItem: React.FC<CharItemProps> = ({thumbnail, name, selected, onCharSelected}) => {

  return (
    <li className={"char__item" + `${selected ? " char__item_selected" : ""}`} onClick={onCharSelected}>
      <img src={thumbnail} alt="abyss"/>
      <div className="char__name">{name}</div>
    </li>
  )
};