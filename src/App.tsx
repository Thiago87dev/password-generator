import { ChangeEvent, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import passwordGenerator from "./generate";
import strengthFunc from "./strength";
import "./App.css";

function App() {
  const [length, setLength] = useState(0);
  const [length2, setLength2] = useState(0);
  const [isCheckedUpper, setIsCheckedUpper] = useState(false);
  const [isCheckedLower, setIsCheckedLower] = useState(false);
  const [isCheckedNumber, setIsCheckedNumber] = useState(false);
  const [isCheckedSymbol, setIsCheckedSymbol] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [qntSelected, setQntSelected] = useState(0);
  const [colorLevel1, setcolorLevel1] = useState("");
  const [colorLevel2, setcolorLevel2] = useState("");
  const [colorLevel3, setcolorLevel3] = useState("");
  const [colorLevel4, setcolorLevel4] = useState("");

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  };

  const handleCheckboxChangeUpper = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckedUpper(e.target.checked);
  };

  const handleCheckboxChangeLower = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckedLower(e.target.checked);
  };

  const handleCheckboxChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckedNumber(e.target.checked);
  };

  const handleCheckboxChangeSymbol = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckedSymbol(e.target.checked);
  };

  const generator = () => {
    let selectedCount = 0;

    if (isCheckedUpper) selectedCount++;
    if (isCheckedLower) selectedCount++;
    if (isCheckedNumber) selectedCount++;
    if (isCheckedSymbol) selectedCount++;

    setQntSelected(selectedCount);
    setLength2(length);

    setPassword(
      passwordGenerator(
        length,
        isCheckedUpper,
        isCheckedLower,
        isCheckedNumber,
        isCheckedSymbol
      )
    );
  };

  useEffect(() => {
    if (strength === "") {
      setcolorLevel1("transparent");
      setcolorLevel2("transparent");
      setcolorLevel3("transparent");
      setcolorLevel4("transparent");
    }
    if (strength === "Too Weak") {
      setcolorLevel1("red");
      setcolorLevel2("transparent");
      setcolorLevel3("transparent");
      setcolorLevel4("transparent");
    }
    if (strength === "Weak") {
      setcolorLevel1("red");
      setcolorLevel2("red");
      setcolorLevel3("transparent");
      setcolorLevel4("transparent");
    }
    if (strength === "Medium") {
      setcolorLevel1("yellow");
      setcolorLevel2("yellow");
      setcolorLevel3("yellow");
      setcolorLevel4("transparent");
    }
    if (strength === "Strong") {
      setcolorLevel1("green");
      setcolorLevel2("green");
      setcolorLevel3("green");
      setcolorLevel4("green");
    }
  }, [strength]);

  useEffect(() => {
    setStrength(strengthFunc(length2, qntSelected));
  }, [length2, qntSelected]);

  const copyToClipboard = (): void => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((error) => {
        console.log("Error copying password: ", error);
      });
  };

  return (
    <>
      <main>
        <h1 className="title">Password Generator</h1>
        <div className="result">
          <p className="result-password">{password}</p>
          <div title="copy" onClick={copyToClipboard} className="btn-copy">
            <FaRegCopy />
          </div>
        </div>
        <div className="settings">
          <div className="length-group">
            <p className="text-length">Character length</p>
            <p className="number-length">{length}</p>
          </div>
          <div>
            <input
              className="input-range"
              type="range"
              id="length"
              min="0"
              max="30"
              value={length}
              onChange={handleLengthChange}
            />
          </div>
          <div className="include-option-group">
            <div className="include-option">
              <input
                id="upper"
                checked={isCheckedUpper}
                onChange={handleCheckboxChangeUpper}
                type="checkbox"
              />
              <label htmlFor="upper">Include Uppercase Letters</label>
            </div>
            <div className="include-option">
              <input
                id="lower"
                checked={isCheckedLower}
                onChange={handleCheckboxChangeLower}
                type="checkbox"
              />
              <label htmlFor="lower">Include Lowercase Letters</label>
            </div>
            <div className="include-option">
              <input
                id="numb"
                checked={isCheckedNumber}
                onChange={handleCheckboxChangeNumber}
                type="checkbox"
              />
              <label htmlFor="numb">Include Numbers</label>
            </div>
            <div className="include-option">
              <input
                id="symb"
                checked={isCheckedSymbol}
                onChange={handleCheckboxChangeSymbol}
                type="checkbox"
              />
              <label htmlFor="symb">Include Symbols</label>
            </div>
          </div>
          <div className="strength">
            <div className="strength-texts">
              <p>Strength</p>
              <p>{strength}</p>
            </div>
            <div className="strength-level-group">
              <div className={`strength-level ${colorLevel1}`}></div>
              <div className={`strength-level ${colorLevel2}`}></div>
              <div className={`strength-level ${colorLevel3}`}></div>
              <div className={`strength-level ${colorLevel4}`}></div>
            </div>
          </div>
          <button onClick={() => generator()} className="btn-generate">
            Generate
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
