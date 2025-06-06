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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorantMatchEntity = void 0;
const typeorm_1 = require("typeorm");
const valorant_match_1 = require("../types/valorant-match");
const valorant_match_player_entity_1 = require("./valorant-match-player.entity");
let ValorantMatchEntity = class ValorantMatchEntity {
};
exports.ValorantMatchEntity = ValorantMatchEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ValorantMatchEntity.prototype, "matchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], ValorantMatchEntity.prototype, "timelineId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Object.values(valorant_match_1.matchTypeKeys), nullable: false }),
    __metadata("design:type", String)
], ValorantMatchEntity.prototype, "matchType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Object.values(valorant_match_1.teamTypeKeys), nullable: false }),
    __metadata("design:type", String)
], ValorantMatchEntity.prototype, "winningTeam", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Object.values(valorant_match_1.valorantMapKeys),
        nullable: false,
    }),
    __metadata("design:type", String)
], ValorantMatchEntity.prototype, "map", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchEntity.prototype, "blueScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ValorantMatchEntity.prototype, "redScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], ValorantMatchEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], ValorantMatchEntity.prototype, "matchDuration", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: false }),
    __metadata("design:type", Date)
], ValorantMatchEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: false }),
    __metadata("design:type", Date)
], ValorantMatchEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => valorant_match_player_entity_1.ValorantMatchPlayerEntity, (valorant_match_player) => valorant_match_player.match),
    __metadata("design:type", Array)
], ValorantMatchEntity.prototype, "players", void 0);
exports.ValorantMatchEntity = ValorantMatchEntity = __decorate([
    (0, typeorm_1.Entity)('valorant_match')
], ValorantMatchEntity);
//# sourceMappingURL=valorant-match.entitiy.js.map