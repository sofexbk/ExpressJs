const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
//{ extended: true }
app.use((req,res,next)=>{
  console.log(`${req.method}:${req.url}`);
  next();
 })
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
/*(request,response,next)=>{
  console.log('Before Handling Request ');
//  response.send(403);
},
(request, response,next) => {
  response.send(Items);
  next();
},*/
(request,response) => {
  response.send(Items);
  console.log('Finished handling get request');
}
);

app.get('/myroute/:item',(request,response)=>{
  // request.params
  console.log(request.params.item);
  const {item}=request.params;
  const ItemR=Items.find((g)=>g.item===item)
  response.send(ItemR);
  //response.send(200);
});


app.post('/myroute', (request, response) => {
  console.log(request.body);
  Items.push(request.body);
  response.sendStatus(201);
});

//GET http://Localhost:3001/books
//GET http://Localhost:3001/books/455
//GET http://Localhost:3001/users/peterpan












