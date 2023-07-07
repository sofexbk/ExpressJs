//console.log("hello");
const express=require('express');

const app =express();
const PORT = 3001;

app.listen(PORT,()=>console.log(`running Epress server on port ${PORT}!` ))

app.get('/Route1' ,(request,response)=>{
   response.send([
    {
        item:'milki',
        quantity:10,
    },
    {
        item:'Toast',
        quantity:30,
    },
    {
        item:'Rejex',
        quantity:100,
    }
   ])
});