"use client";
import React, { useState, useEffect, useRef } from "react";
import Hayaoshi from "./components/Hayaoshi";
import Inputbox from "./components/Inputbox";

export default function ExampleComponent() {
  const [member, setMember] = useState("4");
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
    <>
      <div className="bg-gray-400">
        <h1>早押しボタン</h1>
        <p>人数は？</p>
        <select
          name="member"
          onChange={(event) => setMember(event.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <h2>{Number(member)}</h2>
        <ul>
          <li>
            <Inputbox
              addName={addPlayerName}
              addHandicap={addHandicap}
              addKey={addKey}
            />
          </li>
        </ul>
      </div>
      <Hayaoshi />
    </>
  );
}
