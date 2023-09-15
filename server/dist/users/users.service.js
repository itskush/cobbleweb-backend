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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const client_entity_1 = require("./entities/client.entity");
const photo_service_1 = require("./photo.service");
let UsersService = class UsersService {
    constructor(repo, photoService) {
        this.repo = repo;
        this.photoService = photoService;
    }
    async create(userDto, photos) {
        const addedPhotos = [];
        for (let i = 0; i < photos.length; i++) {
            const addedPhoto = await this.photoService.addPhoto(photos[i], userDto);
            addedPhotos.push(addedPhoto);
        }
        userDto.photos = addedPhotos;
        const user = await this.repo.create(userDto);
        const createdUser = await this.repo.save(user);
        if (createdUser) {
            return {
                status: 201,
                message: 'User was created successfully',
            };
        }
        return Error('User was not created successfully');
    }
    async findOneById(id) {
        return this.repo.findOneBy({ id });
    }
    async findUsersByEmail(email) {
        return this.repo.find({ where: { email } });
    }
    async update(id, attrs) {
        const user = await this.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    async remove(id) {
        const user = await this.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.repo.remove(user);
        return 'User removed successfully';
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        photo_service_1.PhotoService])
], UsersService);
//# sourceMappingURL=users.service.js.map