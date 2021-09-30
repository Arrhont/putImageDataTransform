import React, { Dispatch, SetStateAction } from "react";

type PropsType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export default function FirstPageChildren({
  count,
  setCount,
}: PropsType): JSX.Element {
  const handleClick = (action: "+" | "-"): void => {
    const newValue = action === "+" ? count + 1 : count - 1;
    setCount(newValue);
  };

  return (
    <div>
      <div>First page children</div>
      <div>First page state: {count}</div>
      <button onClick={() => handleClick("+")}>+</button>
      <button onClick={() => handleClick("-")}>-</button>
    </div>
  );
}
