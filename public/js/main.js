// var soilMoisture1 = document.getElementById('node-1');
// var soilMoisture2 = document.getElementById('node-2');

const socket = io();

const topic1 = "wsn/soilmoisture/node-1/value"
const topic2 = "wsn/soilmoisture/node-2/value"

socket.on('message', ({topic, message})=>{

    var layout = { width: 500, height: 400 };
    if(topic == topic1){
        var data = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: message,
            title: { text: "Soil Moisture" },
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 400 },
            gauge: { axis: { range: [null, 100] } }
          }
        ];

        Plotly.newPlot('myDiv', data, layout);
        console.log(message)       
    }
    if(topic == topic2){
        var data = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: message,
            title: { text: "Soil Moisture" },
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 400 },
            gauge: { axis: { range: [null, 100] } }
          }
        ];

        Plotly.newPlot('myDiv2', data, layout);
        console.log(message) 
    }
})

var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 0,
      title: { text: "Soil Moisture" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: { axis: { range: [null, 100] } }
    }
  ];
  
  var layout = { width: 500, height: 400 };

  Plotly.newPlot('myDiv', data, layout);
  Plotly.newPlot('myDiv2', data, layout);
  