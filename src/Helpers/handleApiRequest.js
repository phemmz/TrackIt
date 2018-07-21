let baseUrl = 'https://unilever-track-it.herokuapp.com/api/v1/';

export async function postPfiForm(pfiForm) {
    const auth_token = localStorage.getItem('auth_token');

    try {
      const response = await fetch(`${baseUrl}pfi`, {
        method: 'POST',
        headers: {
          auth_token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pfiForm),
      });
  
      const responseJSON = await response.json();
      console.log(responseJSON, ' responn')
      return responseJSON;
    } catch (error) {
      console.log(error, 'error');
    } 
  }