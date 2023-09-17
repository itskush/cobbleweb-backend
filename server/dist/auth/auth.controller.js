"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const platform_express_1 = require("@nestjs/platform-express");
const client_entity_1 = require("../users/entities/client.entity");
const users_service_1 = require("../users/users.service");
const s3_service_1 = require("./s3.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
let AuthController = class AuthController {
    constructor(repo, authService, s3Service, userService, configService) {
        this.repo = repo;
        this.authService = authService;
        this.s3Service = s3Service;
        this.userService = userService;
        this.configService = configService;
    }
    async login(authLoginDto) {
        return this.authService.login(authLoginDto);
    }
    async register(createUserDto, photos) {
        const userExists = await this.userService.findUsersByEmail(createUserDto.email);
        if (userExists.length > 0) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        if (photos.length < 4) {
            throw new common_1.HttpException('At least 4 images should be uploaded', common_1.HttpStatus.BAD_REQUEST);
        }
        const photoEntities = await Promise.all(photos.map(async (photo) => {
            if (photo.mimetype !== 'image/jpeg' && photo.mimetype !== 'image/png' && photo.mimetype !== 'image/svg') {
                throw new common_1.HttpException('Invalid file type, only png, svg or jpeg supported', common_1.HttpStatus.BAD_REQUEST);
            }
            const key = await this.s3Service.uploadFile(photo, this.configService.get('AWS_BUCKET'));
            return {
                name: photo.originalname,
                key: key,
                url: `https://${this.configService.get('AWS_BUCKET')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${key}`,
            };
        }));
        createUserDto.photos = photoEntities;
        return await this.userService.create(createUserDto, photoEntities);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('photos')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api'),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        s3_service_1.S3Service,
        users_service_1.UsersService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map