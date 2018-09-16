//
const axios = require("axios");
const getClima = async(lat, lng) => {
    //axios
    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=3bdd0750a12163d4be9e9e3d14fe1708`);

    return resp.data.main.temp; //parece que el .data siempre debe de estar
}

module.exports = {
    getClima
}