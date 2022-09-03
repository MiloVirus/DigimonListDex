
const callApi = async() =>
{
    const response = await axios.get ("https://digimon-api.vercel.app/api/digimon")
    if(response)
    {
        //console.log(response.data)
        

        
        response.data.forEach(element => {

            let digiName = element.name
            let digimon = element          
      
           let list = document.createElement("div")
           list.setAttribute("class","col-2 colDigi")
           list.innerHTML= `
           
                <div class="row rowDigi" id="${digiName}" onclick='callDigimon(${JSON.stringify(digimon)})'>
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
            let digimon = (clicked_id.name)
            const responseDigi = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`)
            if(responseDigi)
            {
                const response = await axios.get ("https://digimon-api.vercel.app/api/digimon")
                if(response)
                {
                    const array = response.data
              
                        const {result, fresh, intraining, rookie, champion, ultimate, mega, training, armor} = 
                        {
                          result : array.filter(array => array.level === clicked_id.level),
                          fresh : array.filter(array => array.level === "Fresh"),
                          intraining : array.filter(array => array.level === "In Training"),
                          rookie : array.filter(array => array.level === "Rookie"),
                          champion : array.filter(array => array.level === "Champion"),
                          ultimate : array.filter(array => array.level === "Ultimate"),
                          mega : array.filter(array => array.level === "Mega"),
                          training : array.filter(array => array.level === "Training"),
                          armor : array.filter(array => array.level === "Armor")
                         }
                        
                        unique = [...new Set(array.map(a => a.level))]
                   
                      const labelsDigiData = [
                        {id : 0, level: "In Training" , lengthDigi: intraining.length},
                        {id : 1, level: "Rookie" , lengthDigi: rookie.length }, 
                        {id : 2, level: "Champion" , lengthDigi: champion.length},
                        {id : 3, level: "Ultimate" , lengthDigi: ultimate.length},
                        {id : 4, level: "Fresh" , lengthDigi: fresh.length},
                        {id : 5, level: "Mega" , lengthDigi: mega.length},
                        {id : 6, level: "Training" , lengthDigi: training.length},
                        {id : 7, level: "Armor" , lengthDigi: armor.length}
                      ];
                     
                    let newArrayData = []
                      
                    labelsDigiData.forEach(element=>{

                      newArrayData = labelsDigiData.filter(element => element.level !== clicked_id.level)
    
                    })
                    newArrayData.unshift({id: 8, level: clicked_id.level, lengthDigi: result.length})
                    console.log(newArrayData)

                    let newArray = unique.filter(unique => unique !== clicked_id.level)
                    newArray.unshift(clicked_id.level)
                    
                    newArrayData = newArrayData.map(element=>element.lengthDigi)
                    
                    
                

                const labels = newArray
                  const dataChart = {
                    labels: labels,
                    datasets: [{
                      label: 'Digimon Level Distribution',
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ],
                      borderWidth: 1,
                      data: newArrayData,
                    }]
                  };
                
                  const config = {
                    type: 'bar',
                    data: dataChart,
                    options: {
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    },
                  };
                
                let newDigimon = document.getElementById("digimonContainer")
                
                newDigimon.innerHTML = `
                    <div class="row" id="containerDigiList">
                      <div class="col">
                        <div class = "col-md-12"><h3>${responseDigi.data[0].name}</h3></div> 
                        <div class = "col-md-12"><img src="${responseDigi.data[0].img}"></div>
                        <div class = "col-md-12"><h4>${responseDigi.data[0].level}</h4></div>
                      </div> 
                      <div class="col">
                        <canvas id="myChart"></canvas>
                      </div> 
                    </div>
                `  
                const myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                  );
                }
                
            }  
        }  
callApi()