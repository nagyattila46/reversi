let successAlert=document.getElementById("alert-saved");

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

const sendHttpRequest=(method,url,data)=>{
    return fetch(url,{
        method:method,
        body:JSON.stringify(data),
        headers:data?{'Content-Type':'application/json'}:{}
        
    }).then(response=>{
        if(response.status>=400){
            return response.json().then(errResData=>{
                const error=new Error('Something went wrong!');
                error.data=errResData;
                
                throw error;
            })
        }
        return response.json();
    })
}

const getData=()=>{
    sendHttpRequest('GET','http://localhost:8080/board').then(responseData=>{
        return responseData;
    })
}

const sendData=()=>{
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
    

    sendHttpRequest('POST','http://localhost:8080/rest/create',{
        palya:cellsNumbers,
        szabadMezokSzama:noPiecesCount,    
        egyesekSzama:bluesCount,
        kettesekSzama:redsCount,
        n:8,
        turn:turn
        }
    ).then(responseData=>{
        console.log(responseData)
        saveID=responseData.id;
        $('#alert-success').show();
        successAlert.innerHTML="Tábla mentve,ID:"+saveID;
        delay(function(){
            $('#alert-success').alert('close'); 
        },3000);
        
        
    }).catch(function(error){
        console.log("Hiba:"+error);
    })
    
}
