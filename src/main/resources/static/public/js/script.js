let cells=document.querySelectorAll("td");
let redsPieces = document.querySelectorAll("red-piece");
let bluesPieces = document.querySelectorAll("blue-piece")
const redTurnText = document.querySelectorAll(".red-turn-text");
const blueTurntext = document.querySelectorAll(".blue-turn-text");
const divider = document.querySelector("#divider")
let noPiecesCount=60
let redsCount=0;
let bluesCount=0;
let turn=true  //igaz-kék hamis-piros
let N=8;
var BLUE_PIECE="blue-piece";
var RED_PIECE="red-piece";
var NO_PIECE="noPieceHere";
var selectedPiece=-1



//onclick event hozzáadása az összes mezőhöz
function addClickListener(){
    for(let i=0;i<cells.length;i++){
        if(cells[i].className=="noPieceHere"){
            cells[i].addEventListener("click",placeTile)
        selectedPiece=this.id
        }
        
    }
    cells[35].removeEventListener("click",placeTile);
    cells[36].removeEventListener("click",placeTile);
    cells[27].removeEventListener("click",placeTile);
    cells[28].removeEventListener("click",placeTile);
}addClickListener();



function placeTile(){
    
    
        if(turn){
            deletePossibleMoves();
            this.setAttribute("class","blue-piece");
            selectedPiece=this.id;
            cells[selectedPiece].removeEventListener("click",placeTile);
            noPiecesCount--;
            switchColor();
            checkWinner();
            possibleMoves();
           
        }
        else{
            deletePossibleMoves();
            this.setAttribute("class","red-piece");
            selectedPiece=this.id;
            cells[selectedPiece].removeEventListener("click",placeTile);
            noPiecesCount--;
            switchColor();
            checkWinner();
            possibleMoves();
            
        }
        turn=!turn    
}

function isPossibleMove(x){
    var currentPlayer;
    var enemyPlayer;
    if(turn){
        currentPlayer=BLUE_PIECE;
        enemyPlayer=RED_PIECE;
    }else{
        currentPlayer=RED_PIECE;
        enemyPlayer=BLUE_PIECE;
    }

    var sorbanHanyadik=parseInt(getRowNumber(cells[x].id));
    var hanyadikSor=parseInt(getRowNumber(cells[x].id));
    let vanAtfedes=false;
    let j=0;

        //jobb
    for(j=1;j<N-sorbanHanyadik;j++){

        if(sorbanHanyadik>=N-1){
            break;
        }
        if(cells[x+1].className!=enemyPlayer){
            break;
        }

        if(cells[x+j].className==enemyPlayer){
            if(cells[x+(j+1)].className==currentPlayer){
                return true;
            }
        }
       
    }

    //bal
    for(j=1;j<sorbanHanyadik;j++){
        
        if(sorbanHanyadik<=1){
            
            break;
        }
        if(cells[x-1].className!=enemyPlayer){
            break;
        }   

        if(cells[x-j].className==enemyPlayer){
            if(cells[x-(j+1)].className==currentPlayer){
                return true;
                
            }
        }
       
    }

    //fel
    
    for(j=1;j<hanyadikSor;j++){
        /*
        console.log("x:"+x)
        console.log("j:"+j)
        console.log(x-(j*N))
        */
        if(hanyadikSor<=2){
            
            break;
        }
        if(cells[x-N].className!=enemyPlayer){
            break;
        }   
        
        if(cells[x-(j*N)].className==enemyPlayer){
            
            //console.log(x-(j*N))
            if(cells[x-((j+1)*N)].className==currentPlayer){
                return true;
                
            }
        }

    }

    //le
    
    for(j=1;j<N-hanyadikSor;j++){
        
        if(hanyadikSor>=7){
            
            break;
        }
        if(cells[x+N].className!=enemyPlayer){
            break;
        }   
        
        if(cells[x+(j*N)].className==enemyPlayer){
            
            if(cells[x+(j+1)*N].className==currentPlayer){
                //console.log(x+(j+1)*N)
                return true;
                
            }
        }

    }
    

    
    

}

function deletePossibleMoves(){
    for(let i=0;i<cells.length;i++){
        if(cells[i].className=="possible-move"){
            cells[i].setAttribute("class",NO_PIECE);
        }
    }
}

function possibleMoves(){
    
    for(let i=0;i<cells.length;i++){
        
        if(isPossibleMove(i)){
            cells[i].setAttribute("class","possible-move");
            cells[i].addEventListener("click",placeTile);
            
        }
    }
}possibleMoves();

function checkWinner(){
    bluesCount=0;
    redsCount=0;
    for(let j=0;j<cells.length;j++){
        if(cells[j].className==BLUE_PIECE){
            bluesCount++;
        }
        if(cells[j].className==RED_PIECE){
            redsCount++;
        }
    }
    if(noPiecesCount==0){
        if(redsCount>bluesCount){
            alert("Red wins")
            console.log("Red wins")
        }
        if(bluesCount>redsCount){
            alert("Blue wins")
            console.log("Blue wins")
        }
        if(redsCount==bluesCount){
            console.log("Egyenlő")
        }
        
    }
}

//hanyadik sorban van az elem
function getRowNumber(id){

    switch(true){
        case (id<=7):return 1;
        break;

        case (id<=15):return 2;
        break;

        case (id<=23):return 3;
        break;

        case (id<=31):return 4;
        break;

        case (id<=39):return 5;
        break;

        case (id<=47):return 6;
        break;

        case (id<=55):return 7;
        break;

        case (id<=63):return 8;
        break;

        default:return -1;
    }

}

//hanyadik a sorban az elem
function getRowPosition(id){
    let row=getRowNumber(id);
    let pos=id-(row*N)+9;//????
    return pos;
}


function switchColor(){

    var kivalasztott=parseInt(selectedPiece);
    var sorbanHanyadik=getRowPosition(selectedPiece);
    var currentPlayer=turn?BLUE_PIECE:RED_PIECE;
    var hanyadikSor=parseInt(getRowNumber(kivalasztott));
    var utolsoEllenfel=null;
    var utolsoSajat=null;

    //jobbra néz
    
        for(i=1;i<=N-sorbanHanyadik;i++){
            if(cells[kivalasztott+i].className==NO_PIECE){
                //console.log("break jobb")
                break;
            }
            
            if(cells[kivalasztott+i].className!=currentPlayer && cells[kivalasztott+i].className!=NO_PIECE){
                //console.log("utolso ellenfelnel"+(kivalasztott+i))
                utolsoEllenfel=kivalasztott+i;
            }
            if(cells[kivalasztott+i].className==currentPlayer){
                utolsoSajat=kivalasztott+i;
                }
                
             }
            // console.log("Utolso sajat jobbra: "+utolsoSajat+"Utolso ellenfel jobbra: "+utolsoEllenfel);
            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);
            if(utolsoEllenfel!=null && utolsoSajat!=null){
            for(let j=kivalasztott;j<=s;j++){
                cells[j].setAttribute("class",currentPlayer);
                }
            }
            e=null;
            s=null;
            utolsoEllenfel=null;
            utolsoSajat=null;
            
    
        

    //balra néz
    
        for(i=1;i<sorbanHanyadik;i++){
            //console.log(i)
           // console.log(kivalasztott-i)

            if(cells[kivalasztott-i].className==NO_PIECE){
                //console.log("break bal")
                break;
            }
            
            if(cells[kivalasztott-i].className!=currentPlayer && cells[kivalasztott-i].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott-i;
            }
            if(cells[kivalasztott-i].className==currentPlayer){
                utolsoSajat=kivalasztott-i;
                }
            
            
            }
            //console.log("Utolso sajat balra: "+utolsoSajat+"Utolso ellenfel balra: "+utolsoEllenfel);
            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);

            if(utolsoEllenfel!=null && utolsoSajat!=null){
            for(let j=kivalasztott;j>=s;j--){
                cells[j].setAttribute("class",currentPlayer);
                    }
                }
                e=null;
                s=null;
                utolsoEllenfel=null;
                utolsoSajat=null;
    
        
    //felfele néz
    
        for(i=1;i<hanyadikSor;i++){
           
            if(cells[kivalasztott-(i*N)].className==NO_PIECE){
                //console.log("break fel")
                break;
            }
            
            if(cells[kivalasztott-(i*N)].className!=currentPlayer && cells[kivalasztott-(i*N)].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott-(i*N);
            }
            if(cells[kivalasztott-(i*N)].className==currentPlayer){
                utolsoSajat=kivalasztott-(i*N);
                }
            
            
            }
           // console.log("Utolso sajat felfele: "+utolsoSajat+"Utolso ellenfel felfele: "+utolsoEllenfel)

            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);

            if(utolsoEllenfel!=null && utolsoSajat!=null){
            for(let j=kivalasztott;j>=s;j=j-N){
                cells[j].setAttribute("class",currentPlayer);
                 }
             }
            e=null;
            s=null;
            utolsoEllenfel=null;
            utolsoSajat=null;
        
    

            
    //lefele néz
    
        for(i=1;i<=N-hanyadikSor;i++){

            if(cells[kivalasztott+(i*N)].className==NO_PIECE){
                //console.log("break le");
                break;
            }
            
            if(cells[kivalasztott+(i*N)].className!=currentPlayer && cells[kivalasztott+(i*N)].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott+(i*N);
            }
            if(cells[kivalasztott+(i*N)].className==currentPlayer){
                utolsoSajat=kivalasztott+(i*N);
                }
            
            
            }
            //console.log("Utolso sajat lefele: "+utolsoSajat+"Utolso ellenfel lefele: "+utolsoEllenfel)

            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);
            if(utolsoEllenfel!=null && utolsoSajat!=null){
                for(let j=kivalasztott;j<=s;j=j+N){
                    cells[j].setAttribute("class",currentPlayer);
                }
            }
            e=null;
            s=null;
            utolsoEllenfel=null;
                utolsoSajat=null;
        
        
            let meddig;
            if((N-sorbanHanyadik)<(N-hanyadikSor)){
                meddig=sorbanHanyadik;
            }else{
                meddig=hanyadikSor;
            }
            /*
            console.log("N-sorbanhanyadik");
            console.log(N-sorbanHanyadik);
            console.log("N-hanyadiksor");
            console.log(N-hanyadikSor);*/


        //jobbra fel
        for(let i=1;i<hanyadikSor;i++){
            //console.log(i)
            if(hanyadikSor==1 || sorbanHanyadik==1){
                break;
            }
            
            if(cells[(kivalasztott+i)-(i*N)].className=="noPieceHere"){
                //console.log("break jobbra fel")
                
                break;
            }
            
            if(cells[(kivalasztott+i)-(i*N)].className!=currentPlayer && cells[(kivalasztott+i)-(i*N)].className!=NO_PIECE){
                utolsoEllenfel=(kivalasztott+i)-(i*N);
                
            }
            if(cells[(kivalasztott+i)-(i*N)].className==currentPlayer){
                utolsoSajat=(kivalasztott+i)-(i*N);
                }
                
             }
             //console.log("Utolso sajat jobbra fel: "+utolsoSajat+"Utolso ellenfel jobbra fel: "+utolsoEllenfel);
            
             var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);
            
            if(utolsoEllenfel!=null && utolsoSajat!=null){
            for(let j=kivalasztott;j>=s;j-=(N-1)){
                cells[j].setAttribute("class",currentPlayer);
                }
            
            }
            e=null;
            s=null;
            utolsoEllenfel=null;
            utolsoSajat=null;

            
            //jobbra le
            
            for(i=1;i<=N-sorbanHanyadik;i++){
                //console.log((kivalasztott+i)+(i*N));
                
                if(hanyadikSor==N || sorbanHanyadik==N ){
                    break;
                }

                
                if(cells[(kivalasztott+i)+(i*N)].className==NO_PIECE){
                    //console.log("break jobbra le")
                    break;
                }
                
                if(cells[(kivalasztott+i)+(i*N)].className!=currentPlayer && cells[(kivalasztott+i)+(i*N)].className!=NO_PIECE){
                    utolsoEllenfel=(kivalasztott+i)+(i*N);
                }
                if(cells[(kivalasztott+i)+(i*N)].className==currentPlayer){
                    utolsoSajat=(kivalasztott+i)+(i*N);
                    }
                    
                if(getRowNumber((kivalasztott+i)+(i*N))==N || getRowPosition((kivalasztott+i)+(i*N))==N){
                    break;
                }
                 }
                 //console.log("Utolso sajat jobbra le: "+utolsoSajat+"Utolso ellenfel jobbra le: "+utolsoEllenfel);
                var e=parseInt(utolsoEllenfel);
                var s=parseInt(utolsoSajat);
                
                if(utolsoEllenfel!=null && utolsoSajat!=null){
                for(let j=kivalasztott;j<=s;j+=(N+1)){
                    cells[j].setAttribute("class",currentPlayer);
                    }
                }
                e=null;
                s=null;
                utolsoEllenfel=null;
                utolsoSajat=null;


        //balra fel
        
    
        for(i=1;i<meddig;i++){
            //console.log(i);
            //console.log((kivalasztott-i)-(i*N));
            //console.log("meddig: "+meddig);
           if(sorbanHanyadik==1 || hanyadikSor==1 ){
               break;
           }
            
            if(cells[(kivalasztott-i)-(i*N)].className==NO_PIECE){
                //console.log("break balra fel")
                break;
            }
            
            if(cells[(kivalasztott-i)-(i*N)].className!=currentPlayer && cells[(kivalasztott-i)-(i*N)].className!=NO_PIECE){
                utolsoEllenfel=(kivalasztott-i)-(i*N);
            }
            if(cells[(kivalasztott-i)-(i*N)].className==currentPlayer){
                utolsoSajat=(kivalasztott-i)-(i*N);
                }
            if(getRowNumber((kivalasztott-i)-(i*N))==1 || getRowPosition((kivalasztott-i)-(i*N))==1){
                break;
            }
            
            }
          // console.log("Utolso sajat balra fel: "+utolsoSajat+"Utolso ellenfel balra fel: "+utolsoEllenfel);
            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);

            if(utolsoEllenfel!=null && utolsoSajat!=null){
                for(let j=kivalasztott;j>=s;j-=(N+1)){
                    //console.log(j)
                    cells[j].setAttribute("class",currentPlayer);
                    }
                
                e=null;
                s=null;
                utolsoEllenfel=null;
                utolsoSajat=null;
            }

        //balra le
        
        for(i=1;i<=meddig;i++){
            
            if(hanyadikSor==N){
                break;
            }
             
             if(cells[(kivalasztott-i)+(i*N)].className==NO_PIECE){
                 //console.log("break balra le")
                 break;
             }
             
             if(cells[(kivalasztott-i)+(i*N)].className!=currentPlayer && cells[(kivalasztott-i)+(i*N)].className!=NO_PIECE){
                 utolsoEllenfel=(kivalasztott-i)+(i*N);
                 
             }
             if(cells[(kivalasztott-i)+(i*N)].className==currentPlayer){
                 utolsoSajat=(kivalasztott-i)+(i*N);
                
                 }
             
             if(getRowNumber((kivalasztott-i)+(i*N))==N || getRowPosition((kivalasztott-i)+(i*N))==1){
                 break;
             }
             }
             
             var e=parseInt(utolsoEllenfel);
             var s=parseInt(utolsoSajat);
             if(utolsoEllenfel!=null && utolsoSajat!=null){
                 for(let j=kivalasztott;j<=s;j+=(N-1)){
                     cells[j].setAttribute("class",currentPlayer);
                     }
                 
                 e=null;
                 s=null;
                 utolsoEllenfel=null;
                utolsoSajat=null;
             }
                
        
}
