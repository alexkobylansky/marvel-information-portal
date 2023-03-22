import React, {useEffect, useState, useRef} from "react";
import './charList.scss';
import {Spinner} from "../spinner/Spinner";
import {getAllCharacters} from "../../services/MarvelService";

interface CharListProps {
  onCharSelected: (id: number) => void;
  selectedChar: number | null;
}

export const CharList: React.FC<CharListProps> = ({onCharSelected, selectedChar}) => {
  const firstInit = useRef(false);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [characterList, setCharacterList] = useState({} as ICharacterList);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState<boolean>(false);

  const getCharacters = async () => {
    await getAllCharacters(offset)
      .then(data => {
        if (data) {
          setCharacterList(data);
          setLoading(false);
        }
      });
    setOffset(prevState => prevState + 9);
  };

  useEffect(() => {
    if (!firstInit.current) {
      getCharacters()
    }
    firstInit.current = true;
  }, []);

  const loadMore = async () => {
    setFetching(true);
    setOffset(prevState => prevState + 9);
    await getAllCharacters(offset)
      .then(data => {
        if (data) {
          if (data.data.length < 9) {
            setCharEnded(true);
          }
          setCharacterList((prevState: ICharacterList) => {
            return {
              ...prevState,
              data: [...prevState.data, ...data.data]
            }
          })
          setFetching(false);
        }
      })
      .catch(error => console.log(error))
  };

  const content = (!loading && characterList.data) ? characterList.data.map((item) => <CharItem key={item.id}
                                                                                                onCharSelected={() => onCharSelected(item.id)}
                                                                                                thumbnail={item.thumbnail}
                                                                                                name={item.name}
                                                                                                selected={selectedChar === item.id}/>) : null

  return (
    <div className="char__list">
      {loading && <Spinner/>}
      <ul className="char__grid">
        {content}
      </ul>
      {fetching && <Spinner/>}
      <button type="button" disabled={fetching} style={{"display": charEnded ? "none" : "block"}} className="button button__main button__long" onClick={loadMore}>
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