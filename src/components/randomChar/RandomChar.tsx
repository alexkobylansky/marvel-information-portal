import React, {useState, useEffect} from "react";
import "./randomChar.scss";
import {getCharacter} from "../../services/MarvelService";
import mjolnir from "../../assets/img/png/mjolnir.png";
// import thor from "../../assets/img/jpg/thor.jpeg";

const RandomChar: React.FC = () => {
  const [character, setCharacter] = useState({
    name: "",
    description: "",
    thumbnail: "",
    homepage: "",
    wiki: ""
  });

  const updateChar = async () => {
    const id: number = Math.floor(Math.random() * (1011400 - 1011000) +1011000);

    await getCharacter(id)
      .then(res => setCharacter(res))
      .catch(error => console.log(error))
  };

  useEffect(() => {
    updateChar();
  }, []);

  return (
    <div className="randomchar">
      <div className="randomchar__block">
        <img src={character.thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
          <p className="randomchar__name">{character.name}</p>
          <p className="randomchar__descr">{!character.description ? "There is no description for this character." : character.description}</p>
          <div className="randomchar__btns">
            <a href={character.homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={character.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )
}

export default RandomChar;