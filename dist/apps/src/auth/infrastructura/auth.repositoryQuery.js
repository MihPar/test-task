"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRepository = void 0;
class QueryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkExistUser(data) {
        const { email, username } = data;
        const result = {};
        if (email) {
            await ;
            const data = await this.prisma.user.findUnique({ where: { email } });
            result.email = data ? 'exist' : 'notExist';
        }
        if (username) {
            const data = await this.prisma.user.findUnique({ where: { username } });
            result.username = data ? 'exist' : 'notExist';
        }
        return result;
    }
}
exports.QueryRepository = QueryRepository;
//# sourceMappingURL=auth.repositoryQuery.js.map