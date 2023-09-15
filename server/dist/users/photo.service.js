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
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const photo_entity_1 = require("./entities/photo.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PhotoService = class PhotoService {
    constructor(repo) {
        this.repo = repo;
    }
    async addPhoto(photos, user) {
        const photo = new photo_entity_1.Photo();
        photo.name = photos.key;
        photo.url = photos.url;
        photo.user = user;
        const addPhoto = this.repo.create(photo);
        const createdPhoto = await this.repo.save(addPhoto);
        if (createdPhoto) {
            return createdPhoto;
        }
        return Error('Photo was not created successfully');
    }
};
exports.PhotoService = PhotoService;
exports.PhotoService = PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhotoService);
//# sourceMappingURL=photo.service.js.map