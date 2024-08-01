// useEffectを使って"前"処理を施した後に、描画する

import { useState, useEffect, useLayoutEffect } from "react";


interface Prac4Props {
    val: number
}
export function Prac4({val}: Prac4Props) {
    const [val2, setVal2] = useState<number>(0);

    useLayoutEffect(()=>{
        console.log("useLayoutEffect");
        setVal2(val*2);
    }, [val]);
    useEffect(()=>{
        console.log("useEffect");
    }, [val]);

    console.log("prac4描画");   // valの変更時と、val2の変更時で２度実行されることは避けられない模様
    return (
        <>
            <ul>
                <li>val: {val}</li>
                <li>val2: {val2}</li>
            </ul>
        </>
    );
}
