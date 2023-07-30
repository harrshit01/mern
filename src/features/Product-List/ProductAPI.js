// A mock function to mimic making an async request for data
export  function fetchAllproducts() {
  return new Promise(async(resolve) =>{

    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    
    resolve(data);
  }
  );
}
export function fetchProductsByFilters(filter,sort) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values
  let queryString = '';
  console.log(filter);
  for(let key in filter){
    queryString += `${key}=${filter[key]}&`
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  // ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
  console.log(sort);
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`

  }

  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?'+queryString) 
    const data = await response.json()
    resolve(data)
  }
  );
}

// export function fetchProductsByFilters(filter) {
//   // filter = {"category":"smartphone"}
//   // TODO : on server we will support multi values
//   let queryString = '';
//   for(let key in filter){
//     queryString += `${key}=${filter[key]}&`
//   }
//   console.log(queryString);

//   return new Promise(async (resolve) =>{
//     //TODO: we will not hard-code server URL here
//     const response = await fetch('http://localhost:8080/products?'+queryString) 
//     const data = await response.json()
//     resolve(data)
//   }
//   );
// }

