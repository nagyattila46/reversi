var cells=document.querySelectorAll("td");
var redsPieces = document.querySelectorAll("red-piece");
var bluesPieces = document.querySelectorAll("blue-piece")
const redTurnText = document.getElementById("pirosSzoveg");
const blueTurntext = document.getElementById("kekSzoveg");
const divider = document.querySelector("#divider")
let blueScore=document.getElementById("blueScore");
let redScore=document.getElementById("redScore");
var noPiecesCount=60
var redsCount=2;
var bluesCount=2;
var turn=true  //igaz-kék hamis-piros
let N=8;
var BLUE_PIECE="blue-piece";
var RED_PIECE="red-piece";
var NO_PIECE="noPieceHere";
var selectedPiece=1;
var proba=23232323;


let startGameButton=document.getElementById("button-startgame");
/*
blueScore.innerHTML=bluesCount;
redScore.innerHTML=redsCount;
*/

//onclick event hozzáadása az összes mezőhöz
function addClickListener(){

    for(let i=0;i<cells.length;i++){
        if(cells[i].className=="possible-move"){
            cells[i].removeEventListener("click",placeTile)
        }
    }

    for(let i=0;i<cells.length;i++){
        if(cells[i].className=="possible-move"){
            cells[i].addEventListener("click",placeTile)
        }
        
    }
    
    cells[35].removeEventListener("click",placeTile);
    cells[36].removeEventListener("click",placeTile);
    cells[27].removeEventListener("click",placeTile);
    cells[28].removeEventListener("click",placeTile);
}

function chooseDisabledTiles(){
    this.setAttribute("class","disabled");
    this.removeEventListener("click",chooseDisabledTiles);
}

function addDisabledEventListeners(){
    for(let i=0;i<cells.length;i++){
        if(cells[i].className==NO_PIECE){
            cells[i].addEventListener("click",chooseDisabledTiles)
        }
    }
}addDisabledEventListeners();

function startGame(){
    for(let i=0;i<cells.length;i++){
        
        cells[i].removeEventListener("click",chooseDisabledTiles)
    }
    possibleMoves();
    addClickListener();
    
}
startGameButton.addEventListener("click",startGame)


function setFrontendGraphics(){
    addClickListener();
    deletePossibleMoves();
    possibleMoves();
    blueScore.innerHTML=bluesCount;
    redScore.innerHTML=redsCount;
    if(!turn){
        blueTurntext.setAttribute("class","no-turn-text");
        redTurnText.setAttribute("class","red-turn-text");
    }
    if(turn){
        redTurnText.setAttribute("class","no-turn-text");
        blueTurntext.setAttribute("class","blue-turn-text");
    }
    

}


function getAIMove(){
    var y=0;
    let cellsNumbers=[];
    let data=[];
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(cells[(i*8)+j].className==BLUE_PIECE){
                data.push(1);
            }else if(cells[(i*8)+j].className==RED_PIECE){
                data.push(2);
            }else if(cells[(i*8)+j].className==NO_PIECE || cells[(i*8)+j].className=="possible-move"){
                data.push(0);
            }else if(cells[(i*8)+j].className=="disabled"){
                data.push(3);
            } 
        }
        cellsNumbers.push(data);
        data=[];
    }
    

    sendHttpRequest('POST','http://localhost:8080/rest/getaimove',{
        palya:cellsNumbers,
        szabadMezokSzama:noPiecesCount,    
        egyesekSzama:bluesCount,
        kettesekSzama:redsCount,
        n:8,
        turn:turn
        }
    ).then(responseData=>{
        
        for(i=0;i<N;i++){
            for(j=0;j<N;j++){
                if(responseData.palya[i][j]==2 && cellsNumbers[i][j]==0){
                    y=(i*8)+j;
                    selectedPiece=y;
                }
                
            }
        }
        
        for(let i=0;i<N;i++){
            for(let j=0;j<N;j++){
                if(responseData.palya[i][j]==1){
                    cells[i*N+j].setAttribute("class","blue-piece");
                }
                if(responseData.palya[i][j]==2){
                    cells[i*N+j].setAttribute("class","red-piece");
                }
                if(responseData.palya[i][j]==0){
                    cells[i*N+j].setAttribute("class","noPieceHere");
                }
            }
            
        }
        
        switchColor();
        turn=!turn;
        possibleMoves();
        addClickListener();
        
        
        
        
    }).catch(function(error){
        console.log("Hiba a lépés meghatározásában:"+error);
    })

    
    

}

function placeTile(){
    
            this.setAttribute("class","blue-piece");
          
            deletePossibleMoves();
            selectedPiece=this.id;
            cells[selectedPiece].removeEventListener("click",placeTile);
            noPiecesCount--;
            switchColor();
            //checkWinner();
            blueTurntext.setAttribute("class","no-turn-text");
            redTurnText.setAttribute("class","red-turn-text");
            
           
            console.log(selectedPiece);
            turn=!turn;
            getAIMove();
            
            
            /*
            deletePossibleMoves();
            selectedPiece=this.id;
            cells[selectedPiece].removeEventListener("click",placeTile);
            noPiecesCount--;
            switchColor();
            //checkWinner();
            redTurnText.setAttribute("class","no-turn-text");
            blueTurntext.setAttribute("class","blue-turn-text");
            */
            
            
        
            
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

    var sorbanHanyadik=parseInt(getRowPosition(cells[x].id));
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

        if(cells[x].className==NO_PIECE){
            if(cells[x+j].className==enemyPlayer){

                if(getRowPosition(x+j)==N){
                    break;
                }

                if(cells[x+(j+1)].className==currentPlayer){
                    
                    return true;
                }
                
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

        if(cells[x].className==NO_PIECE){
            if(cells[x-j].className==enemyPlayer){

                if(getRowPosition(x-j)==1){
                    break;
                }
                if(cells[x-(j+1)].className==currentPlayer){
                    return true;
                    
                }
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
        
        if(cells[x].className==NO_PIECE){
          
            if(cells[x-(j*N)].className==enemyPlayer){

                if(getRowNumber(x-(j*N))==1){
                    break;
                }
            
                if(cells[x-((j+1)*N)].className==currentPlayer){
                    return true;
                    
                }
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

        if(cells[x].className==NO_PIECE){
            if(cells[x+(j*N)].className==enemyPlayer){

                if(getRowNumber(cells[x+(j*N)])==N){
                    break;
                }
            
                if(cells[x+(j+1)*N].className==currentPlayer){
                    //console.log(x+(j+1)*N)
                    return true;
                    
                }
            }
    
        }
        
        
    }

    var meddig;
    if(hanyadikSor<sorbanHanyadik){
        meddig=hanyadikSor;
    }
    if(sorbanHanyadik<hanyadikSor){
        meddig=sorbanHanyadik;
    }
    
    //jobb fel

    for(j=1;j<meddig;j++){
        //console.log("x:"+x)
        //console.log("hanyadiksor:"+hanyadikSor);
        //console.log(x-(j*(N-1)))
        if(sorbanHanyadik>=N-1){
            break;
        }
        if(hanyadikSor<=2){
            break;
        }
        if(cells[x-(N-1)].className!=enemyPlayer){
            break;
        }

        if(cells[x].className==NO_PIECE){
            if(cells[x-(j*(N-1))].className==enemyPlayer){

                /*
                if(getRowNumber(x-(j*(N-1)))==1){
                    console.log("break");
                    break;
                }*/
                
                if(cells[x-((j+1)*(N-1))].className==currentPlayer){
                    
                    return true;
                }
                
            }
        }
       
    }

    //jobb le

    for(j=1;j<meddig;j++){
        
        if(sorbanHanyadik>=N-1){
            break;
        }
        if(hanyadikSor>=N-1){
            break;
        }
        if(cells[x+(N+1)].className!=enemyPlayer){
            break;
        }

        if(cells[x].className==NO_PIECE){
            if(cells[x+(j*(N+1))].className==enemyPlayer){
                
                
                if(cells[x+((j+1)*(N+1))].className==currentPlayer){
                    return true;
                }
                
            }
        }
       
    }

    //bal fel

    for(j=1;j<meddig;j++){
        
        if(sorbanHanyadik>=2){
            break;
        }
        if(hanyadikSor<=2){
            break;
        }
        if(cells[x-(N+1)].className!=enemyPlayer){
            break;
        }

        if(cells[x].className==NO_PIECE){
            if(cells[x-(j*(N+1))].className==enemyPlayer){

                if(getRowNumber(x-(j*(N+1)))==1 || getRowPosition(x-(j*(N+1)))==1){
                    break;
                }

                
                if(cells[x-((j+1)*(N+1))].className==currentPlayer){
                    return true;
                }
                
            }
        }
       
    }

    //bal le

    for(j=1;j<meddig;j++){
        
        if(sorbanHanyadik>=N-1){
            break;
        }
        if(hanyadikSor>=N-1){
            break;
        }
        if(cells[x+(N-1)].className!=enemyPlayer){
            break;
        }

        if(cells[x].className==NO_PIECE){
            if(cells[x+(j*(N-1))].className==enemyPlayer){
                
                if(getRowNumber(x-(j*(N-1)))==1 || getRowPosition(x-(j*(N-1)))==1){
                    break;
                }
                
                if(cells[x+((j+1)*(N-1))].className==currentPlayer){
                    return true;
                }
                
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
}

function checkWinner(){
    bluesCount=0;
    redsCount=0;
    let possibleMovesCount=0;
    for(let j=0;j<cells.length;j++){
        if(cells[j].className==BLUE_PIECE){
            bluesCount++;
        }
        if(cells[j].className==RED_PIECE){
            redsCount++;
        }
        if(cells[j].className=="possible-move"){
            possibleMovesCount++;
        }
    }
    if(noPiecesCount==0 || possibleMovesCount==0){
        if(redsCount>bluesCount){
            
            $('#alert-success').show();
            successAlert.innerHTML="Piros nyert";
            delay(function(){
                $('#alert-success').alert('close'); 
            },3000);
            console.log("Red wins")
        }
        if(bluesCount>redsCount){
            
            $('#alert-success').show();
            successAlert.innerHTML="Kék nyert";
            delay(function(){
                $('#alert-success').alert('close'); 
            },3000);
            console.log("Blue wins")
        }
        if(redsCount==bluesCount){
            
            $('#alert-success').show();
            successAlert.innerHTML="Döntetlen";
            delay(function(){
                $('#alert-success').alert('close'); 
            },3000);
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
                break;
            }
            if(cells[kivalasztott+i].className=="disabled"){
                break;
            }
            
            if(cells[kivalasztott+i].className!=currentPlayer && cells[kivalasztott+i].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott+i;
            }
            if(cells[kivalasztott+i].className==currentPlayer){
                utolsoSajat=kivalasztott+i;
                }
                
             }
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

            if(cells[kivalasztott-i].className==NO_PIECE){
                break;
            }
            if(cells[kivalasztott-i].className=="disabled"){
                break;
            }
            
            if(cells[kivalasztott-i].className!=currentPlayer && cells[kivalasztott-i].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott-i;
            }
            if(cells[kivalasztott-i].className==currentPlayer){
                utolsoSajat=kivalasztott-i;
                }
            }
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
                break;
            }

            if(cells[kivalasztott-(i*N)].className=="disabled"){
                break;
            }
            
            
            if(cells[kivalasztott-(i*N)].className!=currentPlayer && cells[kivalasztott-(i*N)].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott-(i*N);
            }
            if(cells[kivalasztott-(i*N)].className==currentPlayer){
                utolsoSajat=kivalasztott-(i*N);
                }
            
            
            }

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
                break;
            }
            if(cells[kivalasztott+(i*N)].className=="disabled"){
                break;
            }
            
            if(cells[kivalasztott+(i*N)].className!=currentPlayer && cells[kivalasztott+(i*N)].className!=NO_PIECE){
                utolsoEllenfel=kivalasztott+(i*N);
            }
            if(cells[kivalasztott+(i*N)].className==currentPlayer){
                utolsoSajat=kivalasztott+(i*N);
                }
            
            
            }

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
            


        //jobbra fel
        for(let i=1;i<hanyadikSor;i++){
            if(hanyadikSor==1 || sorbanHanyadik==1){
                break;
            }
            
            if(cells[(kivalasztott+i)-(i*N)].className=="noPieceHere"){
                break;
            }

            if(cells[(kivalasztott+i)-(i*N)].className=="disabled"){
                break;
            }
            
            if(cells[(kivalasztott+i)-(i*N)].className!=currentPlayer && cells[(kivalasztott+i)-(i*N)].className!=NO_PIECE){
                utolsoEllenfel=(kivalasztott+i)-(i*N);
                
            }
            if(cells[(kivalasztott+i)-(i*N)].className==currentPlayer){
                utolsoSajat=(kivalasztott+i)-(i*N);
                }
                
             }
            
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
                
                if(hanyadikSor==N || sorbanHanyadik==N ){
                    break;
                }

                
                if(cells[(kivalasztott+i)+(i*N)].className==NO_PIECE){
                    break;
                }

                if(cells[(kivalasztott+i)+(i*N)].className=="disabled"){
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
           if(sorbanHanyadik==1 || hanyadikSor==1 ){
               break;
           }
           
            
            if(cells[(kivalasztott-i)-(i*N)].className==NO_PIECE){
                break;
            }
            if(cells[(kivalasztott-i)-(i*N)].className=="disabled"){
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
            var e=parseInt(utolsoEllenfel);
            var s=parseInt(utolsoSajat);

            if(utolsoEllenfel!=null && utolsoSajat!=null){
                for(let j=kivalasztott;j>=s;j-=(N+1)){
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
                 break;
             }

             if(cells[(kivalasztott-i)+(i*N)].className=="disabled"){
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

function resetTable(){
    for(let i=0;i<cells.length;i++){
        cells[i].setAttribute("class",NO_PIECE);
    }
    cells[27].setAttribute("class",BLUE_PIECE);
    cells[36].setAttribute("class",BLUE_PIECE);
    cells[28].setAttribute("class",RED_PIECE);
    cells[35].setAttribute("class",RED_PIECE);
    turn=true;
    possibleMoves();
    redTurnText.setAttribute("class","no-turn-text");
    blueTurntext.setAttribute("class","blue-turn-text");
    addClickListener();
    
}
