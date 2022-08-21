
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
            let digimon = clicked_id.id
            const responseDigi = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`)
            if(responseDigi)
            {
                const response = await axios.get ("https://digimon-api.vercel.app/api/digimon")
                if(response)
                {
                    const array = response.data
                    
                const resultFresh = array.filter( array => array.level === "Fresh" );
                const resultTraining = array.filter( array => array.level === "In Training" );
                const resultRookie = array.filter( array => array.level === "Rookie" );
                const resultChampion = array.filter( array => array.level === "Champion" );
                const resultUltimate = array.filter( array => array.level === "Ultimate" );
                const resultMega = array.filter( array => array.level === "Mega" );


                const labels = [
                    'Fresh',
                    'In training',
                    'Rookie',
                    'Champion',
                    'Ultimate',
                    'Mega',
                  ];
                
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
                      data: [resultFresh.length, resultTraining.length, resultRookie.length, resultChampion.length, resultUltimate.length, resultMega.length],
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