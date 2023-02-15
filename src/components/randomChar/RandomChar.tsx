import React, {useState, useEffect, useRef} from "react";
import "./randomChar.scss";
import {Spinner} from "../spinner/Spinner";
import {getCharacter} from "../../services/MarvelService";
import mjolnir from "../../assets/img/png/mjolnir.png";

export const RandomChar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState<ICharacter>({} as ICharacter);
  const [imageNotFound, setImageNotFound] = useState(false);

  const updateChar = async () => {
    setLoading(true);
    const id: number = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    await getCharacter(id)
      .then((data) => {
        if (data) {
          setCharacter(data);
          setLoading(false)
        } else throw new Error("We couldn't find that character")
      }).catch(error => {
        console.log(error);
        updateChar();
      })
  };

  useEffect(() => {
      if (character?.thumbnail?.includes("image_not_available")) {
      setImageNotFound(true);
    } else setImageNotFound(false);
  }, [character]);

  useEffect(() => {
    updateChar();
  }, []);

  const spinner = loading ? <Spinner/> : null;
  const content = (!loading && character.id) ? <View character={character} imageNotFound={imageNotFound}/> : null;

  return (
    <div className="randomchar">
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  );
}

interface ViewProps {
  character: ICharacter;
  imageNotFound: boolean;
}

const View: React.FC<ViewProps> = ({character, imageNotFound}) => {
  const {thumbnail, name, description, homepage, wiki} = character;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={`randomchar__img ${imageNotFound ? "notFound" : ""}`}/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        {/*TODO Dots must be added at the end of the description*/}
        <p className="randomchar__descr" >{!description ? "There is no description for this character." : description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}