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
        if(isOpen(curr))
            return (acc+curr);
        else if(isClose(curr)){
            if(acc.length>0 && isMatch(curr,acc[acc.length-1])) // added 
                return acc.substring(0,acc.length-1);
            else 
                throw false;
            }
        else 
            return acc;
        },"")).length==0;     
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


export const isMatch: (s1:string , s2:string) => boolean = (s1:string , s2:string) : boolean =>{
    if((s1===')'&&s2==='(')||(s1===']'&&s2==='[')||(s1==='}'&&s2==='{'))
        return true;
    return false;
}  


/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence: (t:WordTree) => string = (t:WordTree):string =>
    (t.children.length === 0) ?  t.root : ((t.root+" ") + (t.children).map(treeToSentence).join(" "));
    

   