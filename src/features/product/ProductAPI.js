
export function fetchProductsByFilters(filter,sort,pagination,admin) {

  // console.log(filter,sort,pagination);
  let queryString = '';

  for(let key in filter){
    
    const categoryValues = filter[key];
    if(categoryValues.length){
      queryString += `${key}=${categoryValues}&`
    }
  }
  
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`

  }
 if(admin){
  queryString+='admin=true';

 }
  return new Promise(async (resolve) =>{
    const response = await fetch('/products?'+queryString ) 
    const data = await response.json();

    const totalItems = response.headers.get("X-Total-Count")
   
    resolve({products:data,totalItems: +totalItems});
 
  }
  );
}
export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/category') 
    const data = await response.json()
    resolve(data)
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/brands') 
    const data = await response.json()
    resolve(data)
  }
  );
}
export function fetchProductByid(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/'+id) ;
    const data = await response.json()
    resolve(data)
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products", {
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
    const response = await fetch('/products/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve( data );
  });
}