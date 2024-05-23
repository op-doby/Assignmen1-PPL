import * as R from "ramda";
import { filter } from "ramda";

const stringToArray = R.split("");

export const isVowel: (c: string) => boolean = (c: string): boolean => 
    ['a', 'e', 'i', 'o', 'u', 'A', 'U', 'E', 'I', 'O'].reduce
    ( (acc: boolean, curr: string): boolean => c === curr || acc, false );


/* Question 1 */
export const countVowels:(s: string) => number = (s: string):number => (filter(isVowel ,stringToArray(s))).length;





/* Question 2 */
export const isPaired: (s: string) => boolean = (s: string) : boolean => {
    try{
        return (stringToArray(s).reduce((acc,curr) => 
        {
        if(isOpen(s))
            return (acc + s);
        else if(isClose(s)){
            if(isMatch(s,acc[acc.length-1]))
                return acc.substring(0,acc.length-1);
            else 
                throw false;
            }
        else 
            return acc;
        },"")).length ==0;     
    } catch(e){
        return false;
    }
}
export const isOpen : (s: string) => boolean = (s: string) : boolean => {
    return ['(','{','['].reduce((acc: boolean, curr: string): boolean => s === curr || acc, false);
}

export const isClose : (s: string) => boolean = (s: string) : boolean => {
    return [')','}',']'].reduce((acc: boolean, curr: string): boolean => s === curr || acc, false);
}


export const isMatch: (s1:string , s2:string) => boolean = (s1:string , s2:string) : boolean => {
    return s1===s2;
} 





/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence: (t:WordTree) => string = (t:WordTree):string =>
    (t.children.length === 0) ?  t.root : (t.root + (t.children).map(treeToSentence));
    

    const t1: WordTree = {
        root: "Hello",
        children: [
        {
        root: "students",
        children: [
        {
        root: "how",
        children: []
        }
        ]
        },
        {
        root: "are",
        children: []
        },
        {
        root: "you?",
        children: []
        },
        ]
        }
        treeToSentence(t1); // ==> Hello students how are you?


