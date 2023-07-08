const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
//{ extended: true }
app.listen(PORT, () => console.log(`Running Express server on port ${PORT}!`));

const Items = [
  {
    item: 'milki',
    quantity: 10,
  },
  {
    item: 'Toast',
    quantity: 30,
  },
  {
    item: 'Rejex',
    quantity: 100,
  },
];

app.get('/myroute', 
(request,response,next)=>{
  console.log('Before Handling Request')
},
(request, response) => {
  response.send(Items);
});

app.post('/myroute', (request, response) => {
  console.log(request.body);
  Items.push(request.body);
  response.sendStatus(201);
});
