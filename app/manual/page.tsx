import Link from "next/link";

export default function Manual() {
  const forbiddenKeys = [
    "Backspace",
    "Enter",
    "Escape",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Control",
    "Alt",
    "Meta",
    "CapsLock",
    "Insert",
    "Process",
    "PageUp",
    "PageDown",
    "End",
    "Home",
    "ArrowLeft",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
  ]; // 禁止キー
  return (
    <>
      <div className="bg-gray-400 min-h-screen h-auto flex flex-col">
        <div className="pagewrapper bg-white w-5/6 max-w-screen-lg mx-auto h-full my-3 flex-1 rounded-xl px-5 leading-loose">
          <h1 className="text-7xl my-4 text-center">使い方</h1>
          <div className="text-center my-4">
            <Link
              href="/"
              className="bg-blue-500 text-white w-auto h-10 rounded-md px-3 py-1 hover:opacity-80 duration-300 font-stick"
            >
              ホームに戻る
            </Link>
          </div>
          <div className="my-4">
            <h2 className="text-3xl py-3">ホーム画面</h2>
            <p>
              プレイヤーの名前と早押しボタンとなるキーを登録します。プレイヤー数を選択し、それぞれ入力した後追加ボタンを押してください。QuickStartを押すと、2人から10人までのプレイヤーを自動で追加しスタートできます。
              <br />
              ただし、全角での入力、禁止キーは登録できません。
            </p>
            <p>禁止キー：{forbiddenKeys.join(", ")}</p>
            <img src="/home.png" alt="home" className="p-5" />
            <img src="/start.png" alt="start" className="p-5" />
            <h2 className="text-3xl py-3">ゲーム画面</h2>
            <p>
              それぞれボタン、プレイヤー名、スコアが表示されます。
              <br />
              ハンデがある場合、ボタンを押した後ハンデの秒数分待機してからボタン判定が行われます。この待機中に他のプレイヤーがボタンを押すと、そのプレイヤーが優先されNext欄にハンデのあるプレイヤーが追加されます。
              <br />
              ※例:ハンデ1秒のAさんがボタンを押した後Bさんが0.5秒後にボタンを押すと、Bさんに解答権がありNextにAさんが追加されます。
              <br />
              トップのプレイヤーは青背景で表示されます。 <br />
              終了する場合はFinishを押してください。
            </p>
            <img src="/game.png" alt="game" className="p-5" />
            <p>
              解答画面ではEnterを押すと正解となり+1ポイント、Backspaceを押すと不正解となります。不正解で待機中のプレイヤーがいる場合、次のプレイヤーに解答権が移ります。
              <br />
              ※2024/8/24現在解答画面で解答ボタンを押すことができません。ハンデがある場合のみNext欄に追加されます。
            </p>
            <img src="/answer.png" alt="answer" className="p-5" />
            <h2 className="text-3xl py-3">リザルト画面</h2>
            <p>
              ゲーム終了後、リザルト画面に移ります。リザルト画面では、プレイヤー名、スコア、順位が表示されます。
              <br />
              再戦:そのまま再戦します。スコアのみリセットされます。
              <br />
              Homeに戻る:ホーム画面に戻ります。すべてのデータがリセットされます。
              <br />
              メンバー変更:プレイヤー数、名前、ボタン、ハンデを変更します。スコアのみリセットされます。
            </p>
            <img src="/result.png" alt="result" className="p-5" />
          </div>
          <div className="text-center my-4">
            <Link
              href="/"
              className="bg-blue-500 text-white w-auto h-10 rounded-md px-3 py-1 hover:opacity-80 duration-300 font-stick"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
