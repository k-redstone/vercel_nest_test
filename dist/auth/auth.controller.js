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
const login_dto_1 = require("./dtos/login.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const config_1 = require("@nestjs/config");
let AuthController = class AuthController {
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    async login(loginDto, res) {
        const tokenData = await this.authService.login(loginDto);
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie('accessToken', tokenData.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'none',
            maxAge: this.configService.get('JWT_ACCESS_TOKEN_EXP'),
        });
        res.cookie('refreshToken', tokenData.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'none',
            maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
        });
        return { message: 'login success' };
    }
    authMe(req) {
        const user = req.user.userId;
        return { success: true, userId: user };
    }
    async refresh(req, res) {
        const isProd = process.env.NODE_ENV === 'production';
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            throw new common_1.UnauthorizedException();
        const tokenData = await this.authService.refresh(refreshToken);
        res.cookie('accessToken', tokenData.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'none',
            maxAge: this.configService.get('JWT_ACCESS_TOKEN_EXP'),
        });
        res.cookie('refreshToken', tokenData.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'none',
            maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
        });
        return { message: 'refreshed' };
    }
    async logout(req, res) {
        const id = req.user.sub;
        const isProd = process.env.NODE_ENV === 'production';
        await this.authService.logout(id);
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'none',
            path: '/',
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'none',
            path: '/',
        });
        return { message: 'logout success' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "authMe", null);
__decorate([
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map