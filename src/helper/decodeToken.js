import jwtDecode from 'jwt-decode';

const decodeToken = (response) => {
    
  const token = response.data.auth_token
  if (token) {
    const decodedToken = jwtDecode(token);
    const userInfo = decodedToken.sub;
    return userInfo;
  } 
  return 'unauthorised';
};
export default decodeToken;