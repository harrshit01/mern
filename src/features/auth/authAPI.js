export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
}
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      console.log(response.ok);
      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else {
        const error = await response.json();
        console.log(error);
        reject(error);
      }
    }catch(error){
      console.log(error);
      reject(error);
    }
    })
}


export function signOut(userData) {
  return new Promise(async (resolve) => {

    resolve({ data: "success" });
  });
}