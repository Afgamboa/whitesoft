import axios from "axios";

const baseUrl = "http://ec2-54-167-121-27.compute-1.amazonaws.com";

export const getCountries = async () => {
  const response = await axios.get(`${baseUrl}/countries`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.status === 200) {
    return response.data.countries;
  }else{
    throw new Error('Server Error')
  }
};

export const newUser = async (username, country) => {
  if(username.trim().length === 0 || country.trim().length === 0){
    throw new Error("Ambos campos son requeridos!")
  }

  if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(username)) {
    throw new Error("Nombre de usuario incorrecto");
  }
  const response = await axios.post(`${baseUrl}/user/new`, {username, country}, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return response.data;
}
