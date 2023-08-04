// A mock function to mimic making an async request for data
export  function fetchAllproducts() {
  return new Promise(async(resolve) =>{

    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    
    resolve(data);
  }
  );
}
export function fetchProductsByFilters(filter,sort,pagination) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values

  // console.log(filter,sort,pagination);
  let queryString = '';

  for(let key in filter){
    
    // queryString += `${key}=${filter[key]}&`
    const categoryValues = filter[key];
    if(categoryValues.length>0){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  // ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
  
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`

  }

  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?'+queryString) 
    const data = await response.json();

    const totalItems = response.headers.get("X-Total-Count")
   
    resolve({products:data,totalItems: +totalItems});
    // 
    }
  );
}
export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/categories') 
    const data = await response.json()
    resolve(data)
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/brands') 
    const data = await response.json()
    resolve(data)
  }
  );
}
export function fetchProductByid(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products/'+id) ;
    const data = await response.json()
    resolve(data)
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
};
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve( data );
  });
}