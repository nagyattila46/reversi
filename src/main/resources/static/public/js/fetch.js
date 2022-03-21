const button=document.getElementById("button")

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
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.text);
                console.log(response);
                throw error;
            })
        }
        return response.json();
    })
}

const getData=()=>{
    sendHttpRequest('GET','http://localhost:8080/board').then(responseData=>{
        console.log(responseData);
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
            }else if(cells[(i*8)+j].className==NO_PIECE){
                data.push(0);
            } 
        }
        cellsNumbers.push(data);
        data=[];
    }

    sendHttpRequest('POST','http://localhost:8080/create',{
        palya:this.cellsNumbers,
        szabadMezokSzama:noPiecesCount,    
        egyesekSzama:bluesCount,
        kettesekSzama:redsCount,
        id:1,
        n:8,
        }
    ).then(responseData=>{
        console.log(responseData);
        console.log("responseData");
    }).catch(function(error){
        console.log("Hiba:"+error);
    })
    
}
button.addEventListener('click',sendData);