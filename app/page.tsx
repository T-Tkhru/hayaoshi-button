"use client";
import React, { useState, useEffect, useRef } from "react";

// player オブジェクトの型を定義
const player: { [key: string]: number } = { A: 0, S: 1, D: 2, F: 3 };

export default function ExampleComponent() {
  const [items, setItems] = useState<string[]>([]);
  const [collect, setCollect] = useState<number[]>([0, 0, 0, 0]); // 四人の正解数を格納する配列

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

    if (
      key === "Digit1" &&
      items.length > 0 &&
      player.hasOwnProperty(items[0])
    ) {
      setCollect((prevCollect) => {
        const newCollect = [...prevCollect];
        newCollect[player[items[0]]] += 1;
        return newCollect;
      });
      setItems([]);
    }

    if (
      key === "Digit2" &&
      items.length > 0 &&
      player.hasOwnProperty(items[0])
    ) {
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
        className="h-100 w-100 bg-green-400"
        tabIndex={0}
        onKeyDown={keyDownHandler}
        ref={containerRef}
      >
        {items.length > 0 && (
          <div
            className="h-100 w-100 bg-blue-400"
            tabIndex={0}
            onKeyDown={answer}
            ref={contentRef} // contentRef を使用
          >
            {items.map((item, index) => (
              <div key={index} className="text-3xl">
                {item}
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <h2>Collect:</h2>
          <ul>
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
}
