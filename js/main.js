const callApi = async() =>
{
    const response = await axios.get ("https://digimon-api.vercel.app/api/digimon")
    if(response)
    {
        console.log(response.data.length)

        
        
        response.data.forEach(element => {

            let digiName= element.name          
            console.log(digiName)
           let list = document.createElement("div")
           list.setAttribute("class","col-4 colDigi")
           list.innerHTML= `
           
                <div class="row rowDigi" id="${digiName}" onclick="callDigimon(${digiName})">
                    <div class="col-8">
                        <div class="digiName">${element.name}</div>
                        <div class="digiLevel">${element.level}</div>
                    </div>
                    <div class="col-4"><img src="${element.img}"></div>    
                </div>
           
           `
           document.getElementById("listDigimon").appendChild(list) 
           
        });
        
        
    }
} 
const callDigimon = async(clicked_id) => 
        {
            console.log(clicked_id.id)
            let digimon = clicked_id.id
            const responseDigi = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`)
            if(responseDigi)
            {
                
                
                let newDigimon = document.getElementById("digimonContainer")
                
                newDigimon.innerHTML = `
                    <div class = "col-md-12"><h3>${responseDigi.data[0].name}</h3></div> 
                    <div class = "col-md-12"><img src="${responseDigi.data[0].img}"></div>
                    <div class = "col-md-12"><h4>${responseDigi.data[0].level}</h4></div>
                `
                
                
            }
            
        }
callApi()