//vamos a hacer una configuracion diferente cuando no mandamos nombre del comando, 
//y solo configurar  los argumentos directamente

const argv = require('yargs').options({
    direccion: {
        alias: "d",
        desc: "Direeccion de la ciudad para obtener el clima",
        demand: true
    }
}).argv;

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima')
    /*
    clima.getClima(40.4167754, -3.7037902) no olvides mencionar "clima, que es la variable que contiene el archivo en donde esta la funcionalidad"
        .then(temp => console.log(temp))
        .catch(e => console.log("error", e));
    teniamos antes asi nuestro codigo
      */

let getinfo = async(direccion) => {
    try {
        let cords = await lugar.getLugarLatLng(direccion)
        let temp = await clima.getClima(cords.lat, cords.lng)
        return `El clima en ${cords.direccion} es de ${temp}`; //${cords.direccion}  ya la obtenemos de cords
    } catch (e) {
        return `No se pudo determinar el clima en  ${direccion}`; // es  ${direccion} y  no ${cords.direccion} por que el lugar tendria que existir para que nos regrese el arreglo con ese dato ademas de la lng y la lat
    }

}

getinfo(argv.direccion)
    .then(mensaje => {
        console.log(mensaje)
    })
    .catch(err => {
        console.log('error', err)
    });
/*
lugar.getLugarLatLng(argv.direccion)
    .then(resp => {
        console.log(resp)
    })
    .catch(err => console.log('error', err));
*/


//console.log(argv.direccion);
/*antes de obtimizar teniamos asi el codigo
let encodedUrl = encodeURI(argv.direccion)
    // encodeURI es para que lo ingresado como parametro en la direccion
    //lo convierta en URL amigable, ya qu elos espacios en blanco podria causarnos problemas, 
    //por lo que tenemos que escaparlos en su forma html
axios.get(`https://mapsgoogleapis.com/maps/api/geocode/json?address=${ encodedUrl }&key=AIzaSyCiPhyvkFLGAGju-SfOc-ZB-CLUzdwOFGQ`)
    .then(resp => {
        // console.log(JSON.stringify(resp.data, undefined, 2));
        // sin el JSON.stringify() los objetos que se encuentran anidados se quedan cerrados, ademas el numero 2 sirve para las sangrias y el espciadop
        //  console.log(resp.status);
        let location = resp.data.results[0] //duda de donde sale el data
            //entramos al result
        let direccion = location.formatted_address;
        let latitud = location.geometry.location.lat;
        let longitud = location.geometry.location.lng;
        console.log(direccion);
        console.log(latitud);
        console.log(longitud);
    })
    .catch(err => console.log('error', err));

//https://developers.google.com/maps/documentation/geocoding/start#get-a-key para la geolocalizacioncon

*/