const {Router} =require('express');
const router=Router();

const markets = [
    {
      store: 'marjane',
    },
    {
      store: 'waikiki',
    },
    {
      store: 'flu',
    },
  ];

router.get('/', 
/*(request,response,next)=>{
  console.log('Before Handling Request ');
//  response.send(403);
},
(request, response,next) => {
  response.send(Items);
  next();
},*/
(request,response) => {
  response.send(markets);
  console.log('Finished handling get request');
}
);

router.get('/:store',(request,response)=>{
  // request.params
  console.log(request.params.store);
  const {store}=request.params;
  const storeR=markets.find((g)=>g.store===store)
  response.send(storeR);
  //response.send(200);
});


router.post('/', (request, response) => {
  console.log(request.body);
  markets.push(request.body);
  response.sendStatus(201);
});

module.exports=router;