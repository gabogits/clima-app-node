//npm i axios --save instalar axios
const axios = require("axios");

const getLugarLatLng = async(direccion) => {

    let encodedUrl = encodeURI(direccion)
        // encodeURI es para que lo ingresado como parametro en la direccion
        //lo convierta en URL amigable, ya qu elos espacios en blanco podria causarnos problemas, 
        //por lo que tenemos que escaparlos en su forma html

    //axios es para solicitudes http es como request pero con promesas, adiferencia de este que maneja callbacks
    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodedUrl }&key=AIzaSyCiPhyvkFLGAGju-SfOc-ZB-CLUzdwOFGQ`)

    if (resp.data.status === "ZERO_RESULTS") {
        throw new Error(`no se encontro resultado para ${direccion}`) //este es lo mismo que el reject de la promesa
    }

    let location = resp.data.results[0]
    let cords = location.geometry.location;

    return {
        direccion: location.formatted_address,
        lat: cords.lat,
        lng: cords.lng
    }




}

module.exports = {
    getLugarLatLng
}

//https://developers.google.com/maps/documentation/geocoding/start#get-a-key para la geolocalizacioncon