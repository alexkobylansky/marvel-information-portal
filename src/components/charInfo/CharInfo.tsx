import React, {useEffect, useState, useRef} from "react";
import './charInfo.scss';
import {getCharacter} from "../../services/MarvelService";
import {Spinner} from "../spinner/Spinner";
import {Skeleton} from "../skeleton/Skeleton";

interface CharInfoProps {
  charId: number | null;
}

export const CharInfo: React.FC<CharInfoProps> = ({charId}) => {
  const firstInit = useRef(false);
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState<ICharacter>({} as ICharacter);

  const updateChar = (charId: number | null) => {
    if (!charId) {
      return
    }
    setLoading(true);
    getCharacter(charId)
      .then((data) => {
        if (data) {
          setCharacter(data);
        } else throw new Error("We couldn't find that character")
      })
      .catch((error: any) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  };

  useEffect(() => {
    if (!firstInit.current) {
      updateChar(charId);
    }
    firstInit.current = true;
  }, []);

  useEffect(() => {
    updateChar(charId);
  }, [charId]);

  const skeleton = character.id || loading ? null : <Skeleton/>;
  const spinner = loading ? <Spinner/> : null;
  const content = (!loading && character.id) ? <View character={character} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {content}
    </div>
  )
}

interface ViewProps {
  character: ICharacter;
}

const View: React.FC<ViewProps> = ({character}) => {
  const {thumbnail, name, description, homepage, wiki, comics} = character;
  let imgStyle = {"objectFit": "cover"}
  if (thumbnail?.includes("image_not_available")) {
    imgStyle = {"objectFit": "contain"}
}

  return (
    <>
      <div className="char__basics">
        {/*@ts-ignore*/}
        <img src={thumbnail} style={imgStyle} alt={name}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description ? description : "There is no description for this character"}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length ? comics.map((item, index) => {
          if (index >= 10) return;
          return <li key={index} className="char__comics-item">
            <a href={item.resourceURI}>{item.name}</a>
          </li>
        } ) : "There is no comics with this character"}
      </ul>
    </>
  )
};