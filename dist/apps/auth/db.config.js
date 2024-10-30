"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        type: 'postgres',
        url: process.env.DATABASE_URL_TEST_TASK,
        autoLoadEntities: true,
        synchronize: true,
    },
});
//# sourceMappingURL=db.config.js.map