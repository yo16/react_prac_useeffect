import { useState, useEffect } from "react";

export function Prac3() {
    const [state1, setState1] = useState<number>(1);
    const [state2, setState2] = useState<number>(10);
    const [state3, setState3] = useState<number>(100);
    const [state4, setState4] = useState<number>(1000);

    useEffect(()=>{
        console.log('state1 is updated', state1);
        setState2(state2+state1);
    }, [state1]);
    useEffect(()=>{
        console.log('state2 is updated', state2);
        setState3(state3+state2);
    }, [state2]);
    useEffect(()=>{
        console.log('state3 is updated', state3);
        setState4(state4+state3);
    }, [state3]);
    useEffect(()=>{
        console.log('state4 is updated', state4);
    }, [state4]);

    function handleOnClick() {
        setState1(state1+1);
    }

    return (
        <>
            <button onClick={handleOnClick}>button</button><br />
            <ul>
                <li>{state1}</li>
                <li>{state2}</li>
                <li>{state3}</li>
                <li>{state4}</li>
            </ul>
        </>
    );
}
