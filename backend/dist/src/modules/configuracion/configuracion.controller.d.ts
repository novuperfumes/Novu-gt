import { ConfiguracionService } from './configuracion.service';
export declare class ConfiguracionController {
    private readonly configService;
    constructor(configService: ConfiguracionService);
    getConfiguracion(): Promise<{
        id: number;
        modo_bazar: boolean;
    }>;
    setModoBazar(body: {
        modo_bazar: boolean;
    }): Promise<{
        id: number;
        modo_bazar: boolean;
    }>;
}
