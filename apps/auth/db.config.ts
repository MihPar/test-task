import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface DatabaseConfig {
  database: Partial<TypeOrmModuleOptions>;
}

export default (): DatabaseConfig => ({
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL_TEST_TASK,
    autoLoadEntities: true,
    synchronize: true,
  },
});
