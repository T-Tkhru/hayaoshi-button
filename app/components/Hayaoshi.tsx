"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HayaoshiProps {
  member?: number;
  names?: string[];
  keys?: string[];
  handicap?: number[];
}

const Hayaoshi: React.FC<HayaoshiProps> = ({
  member = 4,
  names = ["aaaaa", "bbbbb", "ccccc", "ddddd"],
  keys = ["A", "S", "D", "F"],
  handicap = [0.3, 0, 0, 0],
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [collect, setCollect] = useState<number[]>(Array(member).fill(0)); // 四人の正解数を格納する配列

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // 新しい ref を追加

  // 動的なキー処理
  const keyHandlerMap: { [key: string]: () => void } = {};

  // keys 配列に基づいて keyHandlerMap を生成
  keys.forEach((key, index) => {
    const delay = (handicap[index] || 0) * 1000; // `handicap` 配列から遅延時間を取得
    keyHandlerMap[key.toLowerCase()] = () => {
      setTimeout(() => {
        setItems((prevItems) => [...prevItems, key]);
      }, delay);
    };
  });

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key.toLowerCase(); // 小文字に変換して比較
    if (keyHandlerMap[key]) {
      keyHandlerMap[key](); // マッピングされた関数を呼び出す
    }
  };

  const answer = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;

    if (key === "1" && items.length > 0) {
      setCollect((prevCollect) => {
        const newCollect = [...prevCollect];
        newCollect[keys.indexOf(items[0])] += 1;
        return newCollect;
      });
      setItems([]);
    }

    if (key === "2" && items.length > 0) {
      setItems((prevItems) => prevItems.slice(1));
    }
  };

  useEffect(() => {
    if (items.length > 0 && contentRef.current) {
      contentRef.current.focus();
    } else if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [items.length]);
  return (
    <>
      <div
        className="bg-green-400"
        tabIndex={0}
        onKeyDown={keyDownHandler}
        ref={containerRef}
      >
        {items.length > 0 && (
          <div
            className="fixed top-6 right-1/4 h-20 w-2/4 mx-auto bg-blue-400"
            tabIndex={0}
            onKeyDown={answer}
            ref={contentRef} // contentRef を使用
          >
            <ul className="flex space-x-3 w-auto">
              {items.map((item, index) => (
                <li key={index} className="text-2xl">
                  {index + 1} :{names[keys.indexOf(item)]}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="">
          <h2>Collect:</h2>
          <ul className="flex space-x-2">
            {collect.map((count, index) => (
              <li key={index}>
                {names[index]}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Hayaoshi;
