import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export interface DatabaseConfig {
    database: Partial<TypeOrmModuleOptions>;
}
declare const _default: () => DatabaseConfig;
export default _default;
