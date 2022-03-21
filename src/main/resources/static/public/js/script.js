let cells=document.querySelectorAll("td");
let redsPieces = document.querySelectorAll("red-piece");
let bluesPieces = document.querySelectorAll("blue-piece")
const redTurnText = document.querySelectorAll(".red-turn-text");
const blueTurntext = document.querySelectorAll(".blue-turn-text");
const divider = document.querySelector("#divider")
let noPiecesCount=60
let redsCount=2;
let bluesCount=2;
let turn=true  //igaz-kék hamis-piros
let N=8;
var BLUE_PIECE="blue-piece";
var RED_PIECE="red-piece";
var NO_PIECE="noPieceHere"
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
            this.setAttribute("class","blue-piece");
            selectedPiece=this.id;
            cells[selectedPiece].removeEventListener("click",placeTile);
            bluesCount++;
            
            switchColor();
            checkWinner();
            console.log(noPiecesCount);
            
        }
        else{
            this.setAttribute("class","red-piece");
            selectedPiece=this.id;
            cells[selectedPiece].removeEventListener("click",placeTile);
            redsCount++;
            
            switchColor();
            checkWinner();
            console.log(noPiecesCount);
            

        }
        turn=!turn    
}

function checkWinner(){
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
        for(i=N-sorbanHanyadik;i>0;i--){
            if(cells[kivalasztott+i].className!=currentPlayer && cells[kivalasztott+i].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott+i;
            }
            if(cells[kivalasztott+i].className==currentPlayer){
                utolsoSajat=kivalasztott+i;
                }
            }
            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);
            for(let j=e;j<=s;j++){
                cells[j].setAttribute("class",currentPlayer);
            }

    //balra néz
        for(i=sorbanHanyadik-1;i>0;i--){
            if(cells[kivalasztott-i].className!=currentPlayer && cells[kivalasztott-i].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott-i;
            }
            if(cells[kivalasztott-i].className==currentPlayer){
                utolsoSajat=kivalasztott-i;
                }
            }
            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);
            for(let j=s;j<=e;j++){
                cells[j].setAttribute("class",currentPlayer);
            }

    //felfele néz
        for(i=0;i<hanyadikSor;i++){
            if(cells[kivalasztott-(i*N)].className!=currentPlayer && cells[kivalasztott-(i*N)].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott-(i*N);
            }
            if(cells[kivalasztott-(i*N)].className==currentPlayer){
                utolsoSajat=kivalasztott-(i*N);
                }
            }

            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);
            for(let j=s;j<=e;j=j+N){
                cells[j].setAttribute("class",currentPlayer);
            }
    


    //lefele néz
        for(i=N-hanyadikSor;i>0;i--){
            //console.log(kivalasztott+(i*N))
            //console.log(i)
            if(cells[kivalasztott+(i*N)].className!=currentPlayer && cells[kivalasztott+(i*N)].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott+(i*N);
            }
            if(cells[kivalasztott+(i*N)].className==currentPlayer){
                utolsoSajat=kivalasztott+(i*N);
                }
            //console.log("Utolso sajat: "+utolsoSajat+"Utolso ellenfel: "+utolsoEllenfel)
            }

            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);
            for(let j=e;j<=s;j=j+N){
                cells[j].setAttribute("class",currentPlayer);
            }
   
    


    
    
     
}






