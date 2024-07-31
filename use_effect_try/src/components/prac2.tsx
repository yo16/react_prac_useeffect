// 自作クラスのインスタンス配列がuseStateの変数で、更新されたときにうまく更新できるか確認
// prac1の結果を整理する

// 結論
// useEffectは、変数名に対応するメモリを監視していて、その値が変わったら、発火する
// ※ C言語で`&state1`と呼んだ場合の値が変わったら、発火する

import { useState, useEffect } from "react";

class Cls1 {
    val1: number;
    val2: number[];

    constructor() {
        this.val1 = 1;
        this.val2 = [10,20,30];
    }

    addToVal1(num: number = 1) {
        this.val1 += num;
    }
    pushToVal2(num: number = 10) {
        this.val2.push(num);
    }
}

export function Prac2() {
    const [state1, setState1] = useState<Cls1[]>([] as Cls1[]);
    const [state2, setState2] = useState<Cls1[]>([] as Cls1[]);
    const [state3, setState3] = useState<Cls1[]>([] as Cls1[]);
    const [state4, setState4] = useState<Cls1[]>([] as Cls1[]);

    // 初期化
    useEffect(()=>{
        const ins1: Cls1 = new Cls1();
        setState1([ins1]);

        const ins2: Cls1 = new Cls1();
        setState2([ins2]);
        
        const ins3: Cls1 = new Cls1();
        setState2([ins3]);
        
        const ins4: Cls1 = new Cls1();
        setState2([ins4]);
    }, []);


    // インスタンスを変更せず、値の変更だけでは、useEffectは発火しない
    useEffect(()=>{
        console.log("state1 is updated!");
    }, [state1]);
    function handleOnClickButton1() {
        state1[0].addToVal1();
        setState1(state1);
    }
    useEffect(()=>{
        console.log("state2 is updated!");
    }, [state2]);
    function handleOnClickButton2() {
        state2[0].pushToVal2();
        setState2(state2);
    }

    // 中身はまったく変更しなくても、配列を作り直すと発火する
    useEffect(()=>{
        console.log("state3 is updated!");
    }, [state3]);
    function handleOnClickButton3() {
        setState3([...state3]);
    }

    // 配列要素は同じだけど、要素を追加した場合は、発火しない（中身は更新されている）
    useEffect(()=>{
        console.log("state4 is updated!");
    }, [state4]);
    function handleOnClickButton4() {
        state4.push(new Cls1());
        setState4(state4);
    }


    // 中身確認用
    function handleOnClickButton99() {
        console.log(state1);
        console.log(state2);
        console.log(state3);
        console.log(state4);
    }

    return (
        <>
            <button onClick={handleOnClickButton1}>button1</button><br />
            <button onClick={handleOnClickButton2}>button2</button><br />
            <button onClick={handleOnClickButton3}>button3</button><br />
            <button onClick={handleOnClickButton4}>button4</button><br />
            <hr />
            <button onClick={handleOnClickButton99}>button99</button><br />
        </>
    );
}
