
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
        console.log(responseData);
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
            } 
        }
        cellsNumbers.push(data);
        data=[];
    }
    console.log("saveID:"+saveID);

    sendHttpRequest('POST','http://localhost:8080/rest/create',{
        palya:cellsNumbers,
        szabadMezokSzama:noPiecesCount,    
        egyesekSzama:bluesCount,
        kettesekSzama:redsCount,
        id:saveID,
        n:8,
        turn:turn
        }
    ).then(responseData=>{
        console.log(responseData)
    }).catch(function(error){
        console.log("Hiba:"+error);
    })
    
}
