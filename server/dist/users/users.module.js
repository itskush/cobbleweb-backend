"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const users_entity_1 = require("./entities/users.entity");
const client_entity_1 = require("./entities/client.entity");
const photo_entity_1 = require("./entities/photo.entity");
const jwt_strategy_1 = require("../auth/guards/jwt.strategy");
const config_1 = require("@nestjs/config");
const s3_service_1 = require("../auth/s3.service");
const photo_service_1 = require("./photo.service");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, client_entity_1.Client, photo_entity_1.Photo]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                }),
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule,
        ],
        providers: [users_service_1.UsersService, jwt_strategy_1.JwtStrategy, s3_service_1.S3Service, config_1.ConfigService, photo_service_1.PhotoService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map