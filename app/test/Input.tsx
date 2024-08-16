"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface InputProps {
  addName: (name: string) => void;
  addKey: (key: string) => void;
  addHandicap: (handicap: number) => void;
}

const Inputbox: React.FC<InputProps> = ({ addName, addKey, addHandicap }) => {
  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [handicap, setHandicap] = useState<number>(0);

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const keyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const handicapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandicap(Number(event.target.value));
  };

  // フォームの送信処理
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() && key.trim() && handicap) {
      addName(name);
      addKey(key);
      addHandicap(handicap);
      setName("");
      setKey("");
      setHandicap(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={nameChange} />
      <input type="text" value={key} onChange={keyChange} />
      <input type="number" value={handicap} onChange={handicapChange} />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default Inputbox;
