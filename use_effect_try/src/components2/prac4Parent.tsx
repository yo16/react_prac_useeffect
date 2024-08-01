import { useState } from "react";

import { Prac4 } from "./prac4";

export function Prac4Parent() {
    const [inputVal, setInputVal] = useState<number>(0);

    function handleOnClick(){
        // 値を更新
        setInputVal(inputVal+1);
    }

    return (
        <>
            {inputVal}<button onClick={handleOnClick}>→ prac4</button><br />
            <Prac4 val={inputVal} />
        </>
    );
}