"use client";
import React, { useState, useEffect, useRef } from "react";
import Hayaoshi from "./components/Hayaoshi";
import Inputbox from "./components/Inputbox";
import Link from "next/link";

export default function Home() {
  const [member, setMember] = useState("2"); //プレイヤー数
  const [names, setPlayerNames] = useState<string[]>([]); //プレイヤー名のリスト
  const [keys, setKey] = useState<string[]>([]); //ボタンのリスト
  const [handicap, setHandicap] = useState<number[]>([]); //ハンデのリスト
  const [display, setDisplay] = useState<number>(0); //入力画面と早押しボタン画面の切り替え
  const [result, setResult] = useState<number[]>([]); //結果のリスト
  const [submitCheck, setSubmitCheck] = useState<boolean>(false);

  const addPlayerName = (name: string) => {
    setPlayerNames((prevNames) => [...prevNames, name]);
  };

  const addKey = (key: string) => {
    setKey((prevKey) => [...prevKey, key]);
  };

  const addHandicap = (handicap: number) => {
    setHandicap((prevHandicap) => [...prevHandicap, handicap]);
  };

  // 入力画面⇒早押しボタン画面の切り替え
  const setDisplayHayaoshi = () => {
    setDisplay(1);
    setResult([]);
  };

  const setDisplayResult = (collect: number[]) => {
    setDisplay(2);
    setResult((prevResult) => [...prevResult, ...collect]);
  };

  const setDisplayHome = () => {
    setDisplay(0);
    memberReset();
  };

  const setDisplayHome2 = () => {
    setDisplay(0);
  };

  const memberReset = () => {
    setPlayerNames([]);
    setKey([]);
    setHandicap([]);
    setResult([]);
  };

  const deletePlayerName = (index: number) => {
    setPlayerNames((prevNames) => prevNames.filter((_, i) => i !== index));
    setKey((prevKey) => prevKey.filter((_, i) => i !== index));
    setHandicap((prevHandicap) => prevHandicap.filter((_, i) => i !== index));
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

  const handleInputSubmit = () => {
    setSubmitCheck(false); // 新しいInputboxを表示
  };

  const template = () => {
    setMember("4");
    setPlayerNames([
      "プレイヤー1",
      "プレイヤー2",
      "プレイヤー3",
      "プレイヤー4",
    ]);
    setKey(["A", "S", "D", "F"]);
    setHandicap([0, 0, 0, 0]);
    setDisplay(1);
  };

  return (
    <div className="bg-gray-400 h-screen flex flex-col">
      <div className="pagewrapper bg-white w-5/6 max-w-screen-lg mx-auto h-full my-5 flex-1">
        {display === 0 && (
          <div className="page">
            <div className="title&explanation text-center w-3/4 mx-auto">
              <h1 className="text-7xl my-4">早押しボタン</h1>
              <p className="text-xl ">
                ハンデ設定のできる早押しボタンアプリです。人数を選択した後、プレイヤー名、ボタン、ハンデを入力してください。詳しい使い方は
                <Link href="/manual" className="text-blue-700">
                  こちら
                </Link>
              </p>

              <button
                className="bg-red-300 w-auto h-10 rounded-md"
                onClick={template}
              >
                テンプレ
              </button>
            </div>
            <div className="inputarea mx-3">
              <p>人数は？</p>
              <select
                className="border-solid border-gray-400 border-2"
                name="member"
                value={member}
                onChange={(event) => {
                  setMember(event.target.value);
                }}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              {names.length > Number(member) && (
                <p style={{ color: "red" }}>プレイヤーを削除してください</p>
              )}
              <ul className="flex flex-wrap mt-2">
                {[...Array(names.length)].map((_, index) => (
                  <li key={index} className="pr-2 w-48">
                    <h2>プレイヤー名</h2>
                    <p className="h-6">{names[index]}</p>
                    <h2>ボタン</h2>
                    <p>{keys[index]}</p>
                    <h2>ハンデ</h2>
                    <p>{handicap[index]}秒</p>
                    <button
                      className=" border-solid border-gray-400 border-2 mt-5 mx-auto block "
                      onClick={() => deletePlayerName(index)}
                    >
                      削除
                    </button>
                  </li>
                ))}
                {names.length < Number(member) && !submitCheck && (
                  <li className="pr-2 w-auto">
                    <Inputbox
                      addName={addPlayerName}
                      addHandicap={addHandicap}
                      addKey={addKey}
                      checkDuplicate={checkDuplicate}
                      onSubmit={handleInputSubmit} // 提出完了時にコールバック
                    />
                  </li>
                )}
              </ul>
              {names.length === Number(member) && (
                <div className="flex justify-center">
                  <button
                    className="bg-sky-300 w-auto h-10 rounded-md px-3 py-1 hover:opacity-80 duration-300"
                    onClick={setDisplayHayaoshi}
                  >
                    Start!!!
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {display === 1 && (
          <div className="h-screen max-w-screen-lg">
            <Hayaoshi
              member={Number(member)}
              names={names}
              keys={keys}
              handicap={handicap}
              finish={setDisplayResult}
            />
            {/* このままだとフィニッシュの後にプレイヤー情報がキープされる、リセットするかそのまま残すかを選べる選択肢が欲しい。この状態でもstartボタンは押せるようになってる */}
          </div>
        )}
        {display === 2 && (
          <div>
            <h1>結果</h1>
            <ul className="flex flex-wrap">
              {names
                .map((name, index) => ({ name, score: result[index] }))
                .sort((a, b) => b.score - a.score) // 降順にソート
                .map((player, index) => (
                  <li key={index} className="p-2">
                    <h2>プレイヤー名</h2>
                    <p>{player.name}</p>
                    <h2>点数</h2>
                    <p>{player.score}</p>
                  </li>
                ))}
            </ul>
            <div className="flex justify-center space-x-2">
              <button
                className="bg-red-300 w-auto h-10 rounded-md"
                onClick={setDisplayHayaoshi}
              >
                再戦
              </button>
              <button
                className="bg-red-300 w-auto h-10 rounded-md"
                onClick={setDisplayHome}
              >
                Homeに戻る（プレイヤー情報はリセットされます）
              </button>
              <button
                className="bg-red-300 w-auto h-10 rounded-md"
                onClick={setDisplayHome2}
              >
                メンバー変更
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
