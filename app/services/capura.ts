import CryptoJS from "crypto-js";

class name {
    private geo: string = '';

    getGeo() {
        return this.geo;
    }

    public async serviceExterna(url: string, method: string) {
        const requestOptions: RequestInit = {
            method: method,
            redirect: "follow"
        }

        return await fetch(url, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error))
    }

    llenarGeoReferencia(ip: string, ciudad: string, continente: string, pais: string, latitud: string, longitud: string) {
        return this.iiiiii({
            ip: ip,
            continente: ciudad,
            pais: continente,
            ciudad: pais,
            latitud: latitud,
            longitud: longitud
        });
    }

    async obtener(latitud: any = null, longitud: any = null) {
        try {
            await this.serviceApiBigdatacloudNet(latitud, longitud)
        } catch (error1) {
            try {
                await this.serviceIpapiCo(latitud, longitud)
            } catch (error2) {
                try {
                    await this.serviceApiMyIpIo(latitud, longitud)
                } catch (error3) {
                    try {
                        await this.serviceIpinfoIo(latitud, longitud)
                    } catch (error4) {
                        console.error('captura de ip', error4)
                    }
                }
            }
        }
    }

    private async serviceApiBigdatacloudNet(latitud = null, longitud = null) {
        let response = await this.serviceExterna('https://api.bigdatacloud.net/data/reverse-geocode-client', 'GET')
        const responseIp = await this.serviceExterna('https://api.bigdatacloud.net/data/client-ip', 'GET')

        latitud ? response.latitude = latitud : null
        longitud ? response.longitude = longitud : null

        this.geo = this.llenarGeoReferencia(responseIp.ipString, response.city, response.continent, response.countryName, response.latitude, response.longitude)
    }

    private async serviceIpapiCo(latitud = null, longitud = null) {
        let response = await this.serviceExterna('https://ipapi.co/json', 'GET')
        const [continente, ciudad] = response.timezone.split("/")

        latitud ? response.latitude = latitud : null
        longitud ? response.longitude = longitud : null

        this.geo = this.llenarGeoReferencia(response.ip, response.city, continente, response.country_name, response.latitude, response.longitude)
    }

    private async serviceApiMyIpIo(latitud = null, longitud = null) {
        let response = await this.serviceExterna('https://api.my-ip.io/v2/ip.json', 'GET')
        const [continente, ciudad] = response.timezone.split("/")

        latitud ? response.lat = latitud : null
        longitud ? response.lon = longitud : null

        this.geo = this.llenarGeoReferencia(response.ip, response.city, continente, response.country.name, response.location.lat, response.location.lon)
    }

    iiiiii(dataObjet: any) {
        const key = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012");
        const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

        const data = JSON.stringify(dataObjet);

        return CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();
    }

    async serviceIpinfoIo(latitud = null, longitud = null) {
        let response = await this.serviceExterna('https://ipinfo.io/json', 'GET')
        let [latitude, longitude] = response.loc.split(",")
        const [organizacion, pais] = response.loc.split(" - ")
        const [continente, ciudad] = response.timezone.split("/")

        latitud ? latitude = latitud : null
        longitud ? longitude = longitud : null

        this.geo = this.llenarGeoReferencia(response.ip, response.city, continente, pais, latitude, longitude)
    }

    preguntarPermisosGeo() {
        navigator.geolocation.getCurrentPosition(
            async (posicion) => {
                const { latitude, longitude } = posicion.coords
                await this.obtener(latitude, longitude)
            },
            async (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("Permiso denegado por el usuario.")
                        break
                    case error.POSITION_UNAVAILABLE:
                        console.error("La información de ubicación no está disponible.")
                        break
                    case error.TIMEOUT:
                        console.error("La solicitud de ubicación expiró.")
                        break
                    default:
                        console.error("Error desconocido:", error.message)
                        break
                }
                await this.obtener()
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        )
    }
}

export { name }












