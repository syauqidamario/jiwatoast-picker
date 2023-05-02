const roulette = document.getElementById("roulette");
const spinBtn = document.getElementById("spin-button");
const finalValue = document.getElementById("final-value");

//Object yang menyimpan nilai minimum dan maksimum angle untuk value
const rotationVal = [
      {minDegree:0,maxDegree:30, value: "Beef Truffle Mayo"},
      {minDegree:31, maxDegree:90, value: "Cheezy Chicken Mentai"},
      {minDegree:91, maxDegree:150, value: "Double Cheese Hamburg"},
      {minDegree:151, maxDegree:210, value: "Hamburg Curry Mayo"},
      {minDegree:211, maxDegree:270, value: "Egg Curry Mayo"},
      {minDegree:271, maxDegree:330, value: "Smoked Beef & Cheese"},
      {minDegree:331, maxDegree:360, value: "Beef Truffle Mayo"},
];

//Ukuran tiap piece
const data=[10, 10, 10, 10, 10, 10];
//warna background untuk setiap piece
var pieColors = [ 
      "#FFBF00", 
      "#FFEA00", 
      "#DFFF00", 
      "#E4D00A", 
      "#DAA520", 
      "#FCF55F",
];

//Membuat chart
let chartMenu = new Chart(roulette, {
      //Plugin untuk display teks dalam pie chart
      plugins:[ChartDataLabels],
      //Tipe chart: Pie chart
      type:"pie",
      data: {
            //Labels(values yang akan ditampilkan dalam chart)
            labels:[
                  "Beef Truffle Mayo",
                  "Cheezy Chicken Mentai",
                  "Double Cheese Hamburg",
                  "Hamburg Curry Mayo",
                  "Egg Curry Mayo",
                  "Smoked Beef & Cheese"
            ],
            datasets:[
                  {
                        backgroundColor:pieColors,
                        data:data,
                  },
            ],
      },
      options:{
            //Responsive chart
            responsive : true,
            animation: { duration:0 },
            plugins: {
                  //hide tooltip and legends
                  tooltip: false,
                  legend:{
                        display: false,
                  },
                  //display labels inside pie chart
                  datalabels: {
                        color: "#343a40",
                        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                        font: { size: 10 },
                  },
            },
      },
});

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
      for(let i of rotationVal){
            //if the angleValue ada di tengah min dan max, display itu
            if(angleValue >= i.minDegree && angleValue <= i.maxDegree){
                  finalValue.innerHTML = '<p>Value: ${i.value}</p>';
                  spinBtn.disabled = false;
                  break;
            }
      }
};

//Spinner count
let count = 0;
//100 putaran untuk animasi dan putaran terakhir untuk hasilnya
let resultValue = 101;
//mulai spin
spinBtn.addEventListener("click", () => {
      spinBtn.disabled = true;
      //Empty final value
      finalValue.innerHTML = '<p>Good Luck!</p>';
      //Generate random degrees untuk tempat stop
      let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
      //Interval untuk animasi perputaran
      let rotationInterval = window.setInterval(()=>{
            //Set perputaran untuk pie chart
            //Untuk membuat piechart berputar lebih cepat, set resultValue ke 101 supaya berputar 101 derajat
            //at a time dan ini berkurang tiap 1 kali perhitungan.
            //Eventually, dalam perputaran terakhir tersebut akan berputar 1 derajat tiap kali
            chartMenu.options.rotation = chartMenu.options.rotation + resultValue;
            chartMenu.update();
            //If perputaran>360 reset balik ke 0
            if(chartMenu.options.rotation >= 360){
                  count+=1;
                  resultValue -= 5;
                  chartMenu.options.rotation = 0;
            }
            else if(count>15 && chartMenu.options.rotation == randomDegree){
                  valueGenerator(randomDegree);
                  clearInterval(rotationInterval);
                  count = 0;
                  resultValue = 101;
            } 
      }, 10);
});