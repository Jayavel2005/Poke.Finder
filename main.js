fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then((response)=>response.json())
.then((data)=>{
    console.log(data.name);
    console.log(data.types[0].type.name);
    
    
})
.catch((err)=>{
    console.error(err);
    
})