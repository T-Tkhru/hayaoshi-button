"use client";
import { useState } from "react";
import Input from "./Input";
import Hayaoshi from "../components/Hayaoshi";

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

  const finish = (collect: number[]) => {
    console.log(collect);
  };

  return (
    <div>
      <Hayaoshi finish={finish} />
    </div>
  );
}
