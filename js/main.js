
const callApi = async() =>
{
    const response = await axios.get ("https://digimon-api.vercel.app/api/digimon")
    if(response)
    {
        console.log(response.data)
        

        
        response.data.forEach(element => {

            let digiName= element.name          
            console.log(digiName)
           let list = document.createElement("div")
           list.setAttribute("class","col-4 colDigi")
           list.innerHTML= `
           
                <div class="row rowDigi" id="${digiName}" onclick = callDigimon(${JSON.stringify(element)})>
                    <div class="col-8">
                        <div class="digiName">${element.name}</div>
                        <div class="digiLevel">${element.level}</div>
                    </div>
                    <div class="col-4"><img src="${element.img}"></div>    
                </div>
           `
           document.getElementById("listDigimon").appendChild(list) 
           console.log(element)
           
        });
    } 
}

const callDigimon = async(clicked_id) => 
        {
            let digimon = (clicked_id.name)
            console.log(digimon)
            const responseDigi = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`)
            if(responseDigi)
            {
                const response = await axios.get ("https://digimon-api.vercel.app/api/digimon")
                if(response)
                {
                    const array = response.data

                
                        const result = array.filter(array => array.level === clicked_id.level)
                        const fresh = array.filter(array => array.level === "Fresh")
                        const training = array.filter(array => array.level === "In Training")
                        const rookie = array.filter(array => array.level === "Rookie")
                        const champion = array.filter(array => array.level === "Champion")
                        const ultimate = array.filter(array => array.level === "Ultimate")
                        const mega = array.filter(array => array.level === "Mega")
                        
                        const different = array.filter(array => array.level !== clicked_id.level)
                        
                        console.log(fresh)
                        console.log(training)
                        console.log(rookie)
                        console.log(champion)
                        console.log(ultimate)
                        console.log(mega)
                        
                    

                    const labelsDigi = [
                        fresh[1].level,
                        training[1].level,
                        rookie[1].level,
                        champion[1].level,
                        ultimate[1].level,
                        mega[1].level,
                      ];

                      const labelsDigiData = [
                        fresh.length,
                        training.length,
                        rookie.length,
                        champion.length,
                        ultimate.length,
                        mega.length,
                      ];
                    
                    
                    const newArray = labelsDigi.filter(labelsDigi => labelsDigi !== clicked_id.level)
                    newArray.unshift(clicked_id.level)
                    
                    const newArrayData = labelsDigiData.filter(labelsDigiData => labelsDigiData !== result.length)
                    newArrayData.unshift(result.length)
                    console.log(newArrayData)
                    
                

                const labels = newArray;
                
                  const dataChart = {
                    labels: labels,
                    datasets: [{
                      label: 'My First dataset',
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
                    <div class = "col-md-12"><h3>${responseDigi.data[0].name}</h3></div> 
                    <div class = "col-md-12"><img src="${responseDigi.data[0].img}"></div>
                    <div class = "col-md-12"><h4>${responseDigi.data[0].level}</h4></div>
                    <div>
                        <canvas id="myChart"></canvas>
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