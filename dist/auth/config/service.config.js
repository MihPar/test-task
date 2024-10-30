"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceConfig = void 0;
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const authServiceConfig = () => {
    return {
        useFactory: (configService) => ({
            transport: microservices_1.Transport.TCP,
            options: {
                host: configService.get('FILE_SERVICE_HOST') || '0.0.0.0',
                port: Number(configService.get('FILE_SERVICE_PORT')) || 3438,
            },
        }),
        inject: [config_1.ConfigService],
        imports: [config_1.ConfigModule],
        name: 'FILE_SERVICE',
    };
};
exports.authServiceConfig = authServiceConfig;
//# sourceMappingURL=service.config.js.map