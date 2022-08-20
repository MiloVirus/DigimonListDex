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
           list.setAttribute("class","col-md")
           list.innerHTML= `
           <div  class = "col-md-12">
                <button id="${digiName}" onclick="callDigimon(${digiName})" class= "btn btn-primary"><h3>${element.name}</h3></button>
           </div> 
           `
           document.getElementById("sideBar").appendChild(list) 
           
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
                
                console.log(responseDigi)
                let newDigimon = document.createElement("div")
                newDigimon.setAttribute("class","row")
                
                newDigimon.innerHTML = `
                    <div class = "col-md-12"><h3>${responseDigi.data[0].name}</h3></div> 
                    <div class = "col-md-12"><img src="${responseDigi.data[0].img}"></div>
                    <div class = "col-md-12"><h4>${responseDigi.data[0].level}</h4></div>
                `
                
                document.getElementById("digimonContainer").appendChild(newDigimon)
            }
            
        }
callApi()