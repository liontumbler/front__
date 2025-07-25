import { name } from "./capura";

interface modelService {
    id?: number | null
    page?: number
    size?: number
    sort?: Array<any>
    filter?: string | undefined
    data?: any
    url: string
    method: string
}

class service {
    private serviceName: name;
    constructor() {
        this.serviceName = new name()
    }

    protected bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTc1MzA0OTQzN30.jCaeRItG2mSaSvFxtu9Gj8d95uXnk0wVL00P79FQxl0';
    protected refreshTokenString = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTc1MzY1MTM3NH0.veqsk8vOxv4Eznn82XZ19c9Ok9_mM1lz7tRjYGyd_g0';
    protected license = import.meta.env.VITE_LICENSE;
    protected refreshUrl = import.meta.env.VITE_URL_TOKEN_REFRESH;

    private generateHeaders(license: string, bearer: string, adicion: string | null = null) {
        console.log('ooo', adicion);
        
        const myHeaders = new Headers();
        bearer ? myHeaders.append("Authorization", `Bearer ${this.bearer}`) : null
        license ? myHeaders.append("License", this.license) : null
        adicion ? myHeaders.append("-----------", adicion) : null 
        myHeaders.append("Content-Type", "application/json");
        return myHeaders
    }

    public async refreshToken() {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: this.generateHeaders(this.license, this.refreshTokenString, this.serviceName.getGeo()),
            redirect: "follow"
        };
        return await fetch(this.refreshUrl, requestOptions)
            .then((response) => response.json())
            .catch((error) => error);
    }

    

    protected async service({ page, size, sort, filter, url, method, data }: modelService, header: string | null = null): Promise<any> {
        const myHeaders = this.generateHeaders(this.license, this.bearer, header)
        const requestOptions: RequestInit = {
            method: method,
            headers: myHeaders,
            redirect: "follow"
        };

        if (data) {
            const dataService = JSON.stringify(data);
            requestOptions['body'] = dataService
        }

        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (size) params.append("size", size.toString());
        if (sort && sort.length > 0) params.append("sort", JSON.stringify(sort));
        if (filter) params.append("filter", filter);

        const res = await fetch(url, requestOptions)
            .then((response) => response.json())
            .catch((error) => {
                return error;
                //return redirect('/')
            });

        console.log('gggggggg', res);
        
        if (res.code == 401) {
            const tokens = await this.refreshToken()
            if (tokens && tokens.code == 200) {
                this.bearer = tokens.data.token
                this.refreshTokenString = tokens.data.token_refresh
                return await this.service({ page, size, sort, filter, url, method, data })
            } else {
                window.location.href = '/';
            }
        } else {
            return res;
        }
    }
}

export { type modelService, service } 