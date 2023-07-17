const {Router} =require('express');
const router=Router();

const markets = [
    {
      id:1,
      store: 'marjane',
      miles:0.3
    },
    {
      id:2,
      store: 'waikiki',
      miles:0.9
    },
    {
      id:3,
      store: 'flu',
      miles:1
    },
    {
      id:4,
      store: 'Lg',
      miles:7
    },
    {
      id:5,
      store: 'Kingstown',
      miles:3.3
    },
  ];


router.use((req,res,next)=>{
  if(req.session.user) next();
  else res.send(401);
});

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
  console.log(request.query)
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