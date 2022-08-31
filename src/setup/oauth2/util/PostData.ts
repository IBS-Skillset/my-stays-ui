export function PostData(
  type: string,
  userData: { username: string; password: string },
) {
  const BaseUrl = 'http://localhost:9000/auth-server/'

  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: 'POST',
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
