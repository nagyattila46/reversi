const resetButton=document.getElementById("button-reset");
resetButton.addEventListener("click",resetTable);

const loadInput=document.getElementById("loadTablaID");
const loadButton=document.getElementById('button-load');

const saveButton=document.getElementById("button-save");
//const saveInput=;
let saveID;
let loadID=parseInt(loadInput.value);



loadButton.addEventListener("click",loadTable);
saveButton.addEventListener('click',sendData);




function loadTable(){
    
    var url="http://localhost:8080/rest/"+loadID;
    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                
                if(data.palya[i][j]==1){
                    cells[i*N+j].setAttribute("class",BLUE_PIECE);
                }
                if(data.palya[i][j]==2){
                    cells[i*N+j].setAttribute("class",RED_PIECE);
                }
                if(data.palya[i][j]==0){
                    cells[i*N+j].setAttribute("class",NO_PIECE);
                }
                if(data.palya[i][j]==3){
                    cells[i*N+j].setAttribute("class","disabled");
                }
            }
                possibleMoves();
                bluesCount=data.egyesekSzama;
                redsCount=data.kettesekSzama;
                noPiecesCount=data.szabadMezokSzama;
                turn=data.turn;
                setFrontendGraphics();
            
        }
    }).catch(function(){
        console.log("Hiba a betöltés közben");
    })
   
    
    
    
}






