import React, { useState } from "react";

interface InputProps {
  addName: (name: string) => void;
  addKey: (key: string) => void;
  addHandicap: (handicap: number) => void;
}

const Inputbox: React.FC<InputProps> = ({ addName, addKey, addHandicap }) => {
  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [handicap, setHandicap] = useState<string>(""); // 初期値を空文字に設定

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const keyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const handicapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      // 入力値が数値の場合のみ設定
      setHandicap(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() && key.trim() && handicap.trim()) {
      addName(name);
      addKey(key);
      addHandicap(Number(handicap));
      setName("");
      setKey("");
      setHandicap(""); // 入力欄をクリア
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={nameChange}
        className=""
        placeholder="プレイヤー名を入力"
      />
      <input
        type="text"
        value={key}
        onChange={keyChange}
        className=""
        placeholder="ボタンとなるキーを入力 (例:A)"
      />
      <input
        type="text"
        value={handicap}
        onChange={handicapChange}
        className=""
        placeholder="秒単位で入力 (例:0.4)"
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default Inputbox;
