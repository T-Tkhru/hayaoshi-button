"use client";
import React, { useState, useEffect, useRef } from "react";
import Hayaoshi from "./components/Hayaoshi";
import Inputbox from "./components/Inputbox";

export default function Home() {
  const [member, setMember] = useState("2"); //プレイヤー数
  const [names, setPlayerNames] = useState<string[]>([]); //プレイヤー名のリスト
  const [keys, setKey] = useState<string[]>([]); //ボタンのリスト
  const [handicap, setHandicap] = useState<number[]>([]); //ハンデのリスト
  const [display, setDisplay] = useState<boolean>(false); //入力画面と早押しボタン画面の切り替え

  const addPlayerName = (name: string) => {
    setPlayerNames((prevNames) => [...prevNames, name]);
  };

  const addKey = (key: string) => {
    setKey((prevKey) => [...prevKey, key]);
  };

  const addHandicap = (handicap: number) => {
    setHandicap((prevHandicap) => [...prevHandicap, handicap]);
  };

  // 早押しボタン画面と入力画面の切り替え
  const setDisplayReverse = () => {
    setDisplay(!display);
  };

  const memberReset = () => {
    setPlayerNames([]);
    setKey([]);
    setHandicap([]);
  };

  const checkDuplicate = (name: string, key: string) => {
    if (names.includes(name)) {
      return 1;
    } else if (keys.includes(key)) {
      return 2;
    } else {
      return 0;
    }
  };

  return (
    <>
      {display ? (
        <div className="h-screen">
          <Hayaoshi
            member={Number(member)}
            names={names}
            keys={keys}
            handicap={handicap}
          />
          <button onClick={setDisplayReverse}>Finish!!!</button>
          {/* このままだとフィニッシュの後にプレイヤー情報がキープされる、リセットするかそのまま残すかを選べる選択肢が欲しい。この状態でもstartボタンは押せるようになってる */}
        </div>
      ) : (
        <div className="bg-gray-400">
          <h1>早押しボタン</h1>
          <h2>3行テスト用 配列人数</h2>
          <h2>名前{names.length}</h2>
          <h2>キー{keys.length}</h2>
          <h2>ハンデ{handicap.length}</h2>
          <p>人数は？</p>
          <select
            name="member"
            onChange={(event) => {
              setMember(event.target.value);
              memberReset();
            }}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <h2>{Number(member)}</h2>
          <ul className="flex flex-wrap">
            {[...Array(Number(member))].map((_, index) => (
              <li key={index} className="p-2">
                <Inputbox
                  addName={addPlayerName}
                  addHandicap={addHandicap}
                  addKey={addKey}
                  checkDuplicate={checkDuplicate}
                />
              </li>
            ))}
          </ul>
          {names.length === Number(member) && (
            <div className="flex justify-center">
              <button
                className="bg-red-300 w-auto h-10 rounded-md"
                onClick={setDisplayReverse}
              >
                Start!!!
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
