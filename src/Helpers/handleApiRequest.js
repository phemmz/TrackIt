let baseUrl = 'https://unilever-track-it.herokuapp.com/api/v1/';

const auth_token = localStorage.getItem('auth_token');

export async function postPfiForm(pfiForm) {
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
    
    return responseJSON;
  } catch (error) {
    console.log(error, 'error');
  } 
}

export async function getAllShipments() {
  try {
    const response = await fetch(`${baseUrl}shipment`, {
      method: 'GET',
      headers: {
        auth_token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();
    console.log(responseJSON, ' dsRe')
    return responseJSON;
  } catch (error) {
    console.log(error, 'error');
  } 
}