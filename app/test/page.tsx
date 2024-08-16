"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Test() {
  const [items, setItems] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;

    if (key === "KeyA") {
      // すでにタイマーが設定されている場合はクリア
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      const id = setTimeout(() => {
        setItems((prevItems) => [...prevItems, "A"]);
        setTimeoutId(null); // 処理が完了したのでタイマーIDをクリア
      }, 2000);

      setTimeoutId(id); // タイマーIDを保存
    }

    if (key === "KeyB") {
      if (timeoutId) {
        clearTimeout(timeoutId); // Bが押された時にAの処理をキャンセル
        setTimeoutId(null);
      }
      setItems([...items, "B"]);
    }
  };

  const keyDownHandler2 = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;

    if (key === "KeyA") {
      setItems((prevItems) => prevItems.filter((item) => item !== "A"));
    }
    if (key === "KeyB") {
      setItems((prevItems) => prevItems.filter((item) => item !== "B"));
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [items.length]);

  return (
    <>
      {items.length === 0 && (
        <div
          className="container h-full bg-green-400"
          tabIndex={0}
          onKeyDown={keyDownHandler}
          ref={containerRef}
        >
          <div>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {items.includes("A") && (
        <div
          className="h-full bg-blue-300"
          onKeyDown={keyDownHandler2}
          tabIndex={0}
          ref={containerRef}
        >
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {items.includes("B") && (
        <div
          className="h-full bg-red-300"
          onKeyDown={keyDownHandler2}
          tabIndex={0}
          ref={containerRef}
        >
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
