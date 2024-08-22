import React, { useState } from "react";

interface InputProps {
  addName: (name: string) => void;
  addKey: (key: string) => void;
  addHandicap: (handicap: number) => void;
  checkDuplicate: (name: string, key: string) => number;
  onSubmit: () => void;
}

const Inputbox: React.FC<InputProps> = ({
  addName,
  addKey,
  addHandicap,
  checkDuplicate,
  onSubmit,
}) => {
  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [handicap, setHandicap] = useState<string>("0"); // 初期値を空文字に設定
  // const [submitCheck, setSubmitCheck] = useState<boolean>(false);
  const [error, setError] = useState<number>(0); // エラーの状態,1:名前が重複,2:ボタンが重複

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const keyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value.toUpperCase()); // 大文字に変換
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
      const check = checkDuplicate(name, key);
      if (check === 0) {
        addName(name);
        addKey(key);
        addHandicap(Number(handicap));
        onSubmit();
        setName("");
        setKey("");
        setHandicap("0");
      } else if (check === 1) {
        //名前が重複している場合
        setError(1);
        setName("");
      } else if (check === 2) {
        //ボタンが重複している場合
        setError(2);
        setKey("");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>プレイヤー名</h2>
        <input
          type="text"
          value={name}
          onChange={nameChange}
          className=""
          placeholder="プレイヤー名を入力"
        />
        {error === 1 && <p style={{ color: "red" }}>重複しています</p>}
        <h2>ボタンとなるキー</h2>
        <input
          type="text"
          value={key}
          onChange={keyChange}
          className=""
          placeholder="例:A"
        />
        {error === 2 && <p style={{ color: "red" }}>重複しています</p>}
        <h2>ハンデ（秒単位で入力）</h2>
        <input
          type="text"
          value={handicap === "0" ? "" : handicap} // 表示は空文字にする
          onChange={handicapChange}
          className=""
          placeholder="入力なしは0 (例:0.4)"
        />
        <button className="ml-2" type="submit">
          追加
        </button>
      </form>
    </>
  );
};

export default Inputbox;
