"use client";
import { useState } from "react";
import Input from "./Input";

export default function Page() {
  // playernameという配列を状態として定義
  const [names, setPlayerNames] = useState<string[]>([]);
  const [key, setKey] = useState<string[]>([]);
  const [handicap, setHandicap] = useState<number[]>([]);

  const addPlayerName = (name: string) => {
    setPlayerNames((prevNames) => [...prevNames, name]);
  };

  const addKey = (key: string) => {
    setKey((prevKey) => [...prevKey, key]);
  };

  const addHandicap = (handicap: number) => {
    setHandicap((prevHandicap) => [...prevHandicap, handicap]);
  };

  return (
    <div>
      <h1>Player Names</h1>
      <Input
        addName={addPlayerName}
        addHandicap={addHandicap}
        addKey={addKey}
      />
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
        {key.map((key, index) => (
          <li key={index}>{key}</li>
        ))}
        {handicap.map((handicap, index) => (
          <li key={index}>{handicap}</li>
        ))}
      </ul>
    </div>
  );
}
