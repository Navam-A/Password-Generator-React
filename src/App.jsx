import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  let passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%^&*()*+,-./:;<=>~`";

    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(
    () => passwordGenerator(),
    [length, numbers, characters, passwordGenerator]
  );

  return (
    <>
      <h1 className="font-bold text-5xl my-5 text-white shadow">Password 🔐 Generator</h1>
      <div className="bg-gray-700 w-4/4 text-white rounded-lg p-5">
        <div className="d-flex justify-center align-middle">
          <input
            className="w-3/6 h-9  rounded-l-lg my-3 text-orange-500 text-xl font-bold p-2"
            type="text"
            name="password"
            value={password}
            ref={passwordRef}
            id="passwordInput"
            readOnly
          />
          <button className="bg-blue-600 h-9 w-28 p-1 text-xl rounded-r-lg font-bold hover:bg-green-400" onClick={copyPassword}>
            Copy
          </button>
        </div>
        <div className="d-flex my-3">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer "
            onChange={(event) => setLength(event.target.value)}
          />
          <label className="mx-3 text-orange-500 text-2xl font-semibold">
            Length: {length}
          </label>
          <input
            type="checkbox"
            className="ml-7"
            defaultChecked={numbers}
            onChange={()=>{setNumbers((prev) => !prev)}}
          />
          <label className="mx-3 text-orange-500 text-2xl font-semibold">
            Numbers
          </label>
          <input
            type="checkbox"
            className="ml-7"
            defaultChecked={characters}
            onChange={()=>{setCharacters((prev) => !prev)}}
          />
          <label className="mx-3 text-orange-500 text-2xl font-semibold">
            Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
