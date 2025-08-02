import { name } from "./capura";

interface modelService {
    id?: number | null
    data?: any
    url: string
    method: string
}

class service {
    private serviceName: name;
    constructor() {
        this.serviceName = new name()
    }

    protected license = import.meta.env.VITE_LICENSE;
    protected refreshUrl = import.meta.env.VITE_URL_TOKEN_REFRESH;

    private generateHeaders(license: string, adicion: string | null = null) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('access_token') as string}`)
        license ? myHeaders.append("License", this.license) : null
        adicion ? myHeaders.append("-----------", adicion) : null 
        myHeaders.append("Content-Type", "application/json");
        return myHeaders
    }

    public async refreshToken() {
        await this.serviceName.obtener()
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: this.generateHeaders(this.license, this.serviceName.getGeo()),
            redirect: "follow"
        };
        return await fetch(this.refreshUrl, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    protected async service({ url, method, data }: modelService, header: string | null = null): Promise<any> {
        const myHeaders = this.generateHeaders(this.license, header)
        const requestOptions: RequestInit = {
            method: method,
            headers: myHeaders,
            redirect: "follow"
        };

        if (data) {
            const dataService = JSON.stringify(data);
            requestOptions['body'] = dataService
        }

        const res = await fetch(url, requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));

        console.log('service', res);
        if (res.code == 401) {
            const tokens = await this.refreshToken()
            console.log('refresh_token', tokens);
            if (tokens && tokens.code == 200) {
                localStorage.setItem('access_token', res.datos.access_token);
                localStorage.setItem('refresh_token', res.datos.refresh_token);
                return await this.service({ url, method, data })
            } else {
                localStorage.clear();
                window.location.href = '/';
            }
        } else {
            return res;
        }
    }
}

export { type modelService, service } 