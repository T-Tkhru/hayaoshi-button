"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HayaoshiProps {
  member?: number;
  names?: string[];
  key?: string[];
  handicap?: number[];
}

const Hayaoshi: React.FC<HayaoshiProps> = ({
  member = 4,
  names = ["aaaaa", "bbbbb", "ccccc", "ddddd"],
  key = ["A", "S", "D", "F"],
  handicap = [0, 0, 0, 0],
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [collect, setCollect] = useState<number[]>(Array(member).fill(0)); // 四人の正解数を格納する配列

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // 新しい ref を追加

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;

    if (key === "KeyA") {
      setTimeout(() => {
        setItems((prevItems) => [...prevItems, "A"]);
      }, 2000);
    }

    if (key === "KeyS") {
      setItems((prevItems) => [...prevItems, "S"]);
    }

    if (key === "KeyD") {
      setItems((prevItems) => [...prevItems, "D"]);
    }

    if (key === "KeyF") {
      setItems((prevItems) => [...prevItems, "F"]);
    }
  };

  const answer = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;

    if (key === "Digit1" && items.length > 0) {
      setCollect((prevCollect) => {
        const newCollect = [...prevCollect];
        newCollect[names.indexOf(items[0])] += 1;
        return newCollect;
      });
      setItems([]);
    }

    if (key === "Digit2" && items.length > 0) {
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
        className="h-screen bg-green-400"
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
                  {index + 1} : player{names.indexOf(item) + 1}
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
                Player {index + 1}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Hayaoshi;
