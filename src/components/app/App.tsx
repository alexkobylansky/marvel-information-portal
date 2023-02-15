import {useState} from "react";
import {AppHeader} from "../appHeader/AppHeader";
import {RandomChar} from "../randomChar/RandomChar";
import {CharList} from "../charList/CharList";
import {CharInfo} from "../charInfo/CharInfo";

import decoration from "../../assets/img/png/vision.png";

export const App = () => {
  const [selectedChar, setSelectedChar] = useState<number | null>(null);

  const onCharSelected = (id: number) => {
    setSelectedChar(id)
  }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected} selectedChar={selectedChar}/>
                    <CharInfo charId={selectedChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}