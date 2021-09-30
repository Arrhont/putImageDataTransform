import React, { Dispatch, SetStateAction } from "react";
import FirstPageChildren from "./FirstPageChildren";

type PropsType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export default function FirstPage({ count, setCount }: PropsType): JSX.Element {
  return (
    <>
      <h3>FirstPage</h3>
      <FirstPageChildren count={count} setCount={setCount} />
    </>
  );
}
