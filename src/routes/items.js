const {Router} =require('express');
const router=Router();

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
  response.cookie('visited',true,{maxAge:60000})
  response.send(Items);
  console.log('Finished handling get request');
});

router.get('/:item',(request,response)=>{
  // request.params
  //console.log(request.headers.cookie)
  console.log(request.cookies)
  //console.log(request.params.item);
  const {item}=request.params;
  const ItemR=Items.find((g)=>g.item===item)
  response.send(ItemR);
  //response.send(200);
});


router.post('/', (request, response) => {
  console.log(request.body);
  Items.push(request.body);
  response.sendStatus(201);
});

router.get('/cart',(request,response)=>{

});
router.post('/cart/item',(request,response)=>{
  const {item,quantity}=request.body;
  const cartItem={item,quantity};
  //console.log(cartItem);
  response.send(request.session);
});

module.exports=router;