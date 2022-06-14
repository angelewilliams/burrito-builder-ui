export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        throw new Error('Something went wrong')
      }
    })
}

export const postOrder = (infoToPost) => {
 return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify({
       name: infoToPost.name , 
       ingredients: infoToPost.ingredients
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        throw new Error('Something went wrong')
      }
    })
   
}