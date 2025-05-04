

export interface Line {
    x: number,
    y: number,
    choosen:boolean
  }
 
  export type NimStatus = 'win'|'loose'|'instructions';

function numberToBinaryString(num: number): string {
    return num.toString(2);
}

function transformToBinary(p:number[]):String[]{
    let st:String[]=[];
    let maks=0;
    let a=0;
    while(a<p.length){
        let v=p[a];
        let s= numberToBinaryString(v);
        if(s.length>maks){
            maks=s.length;
        }
        st.push(s);
        a+=1;
    }

    let state:String[]=[];
    for(let i=0;i<st.length;++i){
        let s=st[i];
        let add=Math.abs(s.length-maks);
        let ss=s;
        if(add!=0){
            let b=0;
            while(b<add){
                ss="0"+ss;
                b+=1;
            }

        }
        state.push(ss);

    }
    return state;
}

 export function evenPosition( lines:Line[][]):boolean{
    let state=transformToBinary(lines.map(l=>l.length));
    let even=true;
    for(let j=0;j<state[0].length;++j){
        let sum=0;
        for(let i=0;i<state.length;++i){
            let s=state[i];
            if(s.charAt(j)=='1'){
                sum=1-sum;
            }
        }
        if(sum!=0){
            even=false;
            break;
        }
    }
    return even;
}

export function evenPositionNumbers( stevila:number[]):boolean{
    let state=transformToBinary(stevila);
    let even=true;
    for(let j=0;j<state[0].length;++j){
        let sum=0;
        for(let i=0;i<state.length;++i){
            let s=state[i];
            if(s.charAt(j)=='1'){
                sum=1-sum;
            }
        }
        if(sum!=0){
            even=false;
            break;
        }
    }
    return even;
}

export function randomMove(lines:Line[][]):void {
    let a=Math.floor(lines.length*Math.random());
    let b=Math.floor(lines[a].length*Math.random());
    lines[a][b].choosen=true;
}

export function oddMove( lines:Line[][]):void {
    let numbers:number[]=[];
    for(let c of lines){
        numbers.push(c.length);
    }
    for(let i=0;i<numbers.length;++i){
        let num=numbers[i];
        let start=numbers[i];
        let finished=false;
        const oldNumbers=numbers[i]
        while(0<=num){
            numbers[i]=num;
            if(evenPositionNumbers(numbers)){
                for(let j=0;j<lines[i].length-num;++j){
                    lines[i][j].choosen=true;
                }
                finished=true;
                break;
            }
            num-=1;
        }
        numbers[i]=oldNumbers;
        if(finished==true){
            break;
        }
        else{
            numbers[i]=start;
        }
    }
}
