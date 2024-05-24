import { Result, makeFailure, makeOk, bind, either, isFailure } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult: <T>(pred: (x: T) => boolean, a: T[]) => Result<T> = <T>(pred: (x: T) => boolean, a: T[]):Result<T> => 
     a.reduce((acc: Result<T> ,curr: T) => ((pred(curr) && isFailure(acc)) ? makeOk(curr): acc) ,makeFailure("No arguments matching"));
//Write a generic pure function findResult which takes a predicate and an array, and returns an
//Ok on the first element that the predicate returns true for, or a Failure if no such element exists.


/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 :(a: number[]) => Result<number> = (a: number[]):Result<number> =>
    bind(findResult((x:number):boolean=>x%2==0,a),(x:number)=>makeOk(x*x));

export const returnSquaredIfFoundEven_v3 : (a: number[]) => number = (a: number[]):number =>
    either(findResult((x:number):boolean=>x%2==0,a),(x:number)=>(x*x),(message:string)=>-1);