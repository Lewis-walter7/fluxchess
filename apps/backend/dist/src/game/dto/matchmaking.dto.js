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
exports.MatchmakingJoinDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RatingSnapshotDto {
    rating;
    deviation;
    volatility;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(100),
    (0, class_validator_1.Max)(4000),
    __metadata("design:type", Number)
], RatingSnapshotDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], RatingSnapshotDto.prototype, "deviation", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], RatingSnapshotDto.prototype, "volatility", void 0);
class MatchmakingJoinDto {
    userId;
    timeControl;
    rating;
    latencyMs;
    preferredRange;
    deviceFingerprint;
}
exports.MatchmakingJoinDto = MatchmakingJoinDto;
__decorate([
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], MatchmakingJoinDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['bullet', 'blitz', 'rapid', 'classical']),
    __metadata("design:type", String)
], MatchmakingJoinDto.prototype, "timeControl", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RatingSnapshotDto),
    __metadata("design:type", RatingSnapshotDto)
], MatchmakingJoinDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], MatchmakingJoinDto.prototype, "latencyMs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], MatchmakingJoinDto.prototype, "preferredRange", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MatchmakingJoinDto.prototype, "deviceFingerprint", void 0);
//# sourceMappingURL=matchmaking.dto.js.map