import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';

export const authServiceConfig = (): ClientsProviderAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        host: configService.get('FILE_SERVICE_HOST') || '0.0.0.0',
        port: Number(configService.get('FILE_SERVICE_PORT')) || 3438,
      },
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
    name: 'FILE_SERVICE',
  };
};
