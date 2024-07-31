// 自作クラスのインスタンス配列がuseStateの変数で、更新されたときにうまく更新できるか確認

import { useState, useEffect } from "react";


class ClsPrac1 {
    param1: number;
    constructor(p1: number) {
        this.param1 = p1;
    }
}

class ClsPrac2 {
    param1: number[];
    constructor(p1: number) {
        this.param1 = [p1];
    }
    get param() {
        return this.param1;
    }
    public pushParam(n: number){
        this.param1.push(n);
    }
}

export function Prac1() {
    const [aryPrac1, setAryPrac1] = useState<ClsPrac1[]>([] as ClsPrac1[]);
    const [aryPrac2, setAryPrac2] = useState<ClsPrac2[]>([] as ClsPrac2[]);
    const [aryPrac3, setAryPrac3] = useState<ClsPrac2[]>([new ClsPrac2(1)]);
    const [aryPrac4, setAryPrac4] = useState<ClsPrac2[]>([new ClsPrac2(1)]);
    const [counter, setCounter] = useState<number>(0);

    // 初期化
    useEffect(()=>{
        const ary1: ClsPrac1[] = [];
        ary1.push(new ClsPrac1(1));
        ary1.push(new ClsPrac1(2));
        ary1.push(new ClsPrac1(3));
        setAryPrac1(ary1);

        const ary2: ClsPrac2[] = [];
        setAryPrac2(ary2);
    }, []);

    // 同じ要素数・内容で上書きされたとき、useEffectが発動するか
    useEffect(()=>{
        console.log("aryPrac1 is updated!");    // → 発動する！
        setCounter(counter+1);
    }, [aryPrac1]);
    function handleOnButton1Click() {
        const ary: ClsPrac1[] = [];
        ary.push(new ClsPrac1(1));
        ary.push(new ClsPrac1(2));
        ary.push(new ClsPrac1(3));
        setAryPrac1(ary);
    }

    // 配列要素が増えた時に、発動するか
    useEffect(()=>{
        console.log("aryPrac2 is updated!");    // → 発動する！
        setCounter(counter+1);
    }, [aryPrac2]);
    function handleOnButton2Click() {
        const ary: ClsPrac2[] = [];
        for(let i=0; i<counter; i++){
            ary.push(new ClsPrac2(counter+1));
        }
        setAryPrac2(ary);
    }

    // インスタンスは変わらないが、インスタンスの中の状態が変わったときに、発動するか
    useEffect(()=>{
        console.log("aryPrac3 is updated!");    // → 発動しない
        console.log(aryPrac3);
        //setCounter(counter+1);        // これをやると無限ループになる・・・なぜ？
    }), [aryPrac3];
    function handleOnButton3Click() {
        aryPrac3[0].pushParam(3);
        setAryPrac3(aryPrac3);
    }
    function handleOnButton3PlusClick() {
        aryPrac3[0].pushParam(3);
        setAryPrac3([...aryPrac3]);     // これなら動く
    }

    // 配列の変数は変わらないが、要素数が増えた時は？
    useEffect(()=>{
        console.log("aryPrac4 is updated!");    // → 初回だけ発動する
        console.log(aryPrac4);
        //setCounter(counter+1);        // これをやると無限ループになる・・・なぜ？
    }), [aryPrac4];
    function handleOnButton4Click() {
        aryPrac4.push(new ClsPrac2(4));
        setAryPrac4(aryPrac4);
    }


    // 状態チェック用
    function handleOnButton99Click() {
        console.log(aryPrac1);
        console.log(aryPrac2);
        console.log(aryPrac3);
        console.log(aryPrac4);
    }

    return (
        <>
            <button onClick={handleOnButton1Click}>button1</button><br />
            <button onClick={handleOnButton2Click}>button2</button><br />
            {counter}
            <ul>
                {aryPrac2.map((p2)=>(
                    <li>{p2.param}</li>
                ))}
            </ul><br />

            <button onClick={handleOnButton3Click}>button3</button><br />
            <button onClick={handleOnButton3PlusClick}>button3対策</button><br />
            <button onClick={handleOnButton4Click}>button4</button><br />
            
            <hr />
            <button onClick={handleOnButton99Click}>button99</button><br />

        </>
    );
}
