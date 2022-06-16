const express = require('express')
const cors = require('cors')
const app = express()


// const hostname = 'http://192.168.31.70'
const port = 3001

app.use(cors());

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
}
app.get('/', (req, res) => {    
    mySend(res);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
