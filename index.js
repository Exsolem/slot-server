const express = require('express');
const path = require('path');
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions ={
  origin:'*',        
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    mySend(res)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


const getArr = (count) => {
  const arr = []
  for(let i = 0; i < count; i++){
      arr.push(Math.floor(Math.random() * 6))
  }
  return {arr:arr,matches:getCombinations(arr)};
}
const getCombinations = (arr) => {
  const matchesArr = []
  let matches = [];
  for(let i = 1; i < arr.length; i++){
      const prev = arr[i - 1];
      const next = arr[i + 1];
      const cur = arr[i];
      const isMatch = (
          (prev === cur) &&
          (cur === next) &&
          Math.floor((i - 1) / 5) === Math.floor((i + 1) / 5)
      )
      if(isMatch){
          !matches.includes(i) && matches.push(i);
          !matches.includes(i - 1) && matches.push(i - 1);
          !matches.includes(i + 1) && matches.push(i + 1);
      }else if(matches.length > 2){
          matches.sort();
          matchesArr.push(matches);
          matches = [];
      } else{
          matches = [];
      }
  }
  return matchesArr
}
const mySend = (res) => {
  res.send(JSON.stringify(getArr(25)))
};

