<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

### 🚀 Quickstart for FE developers

```bash
git clone https://github.com/yourorg/travel-backend.git
cd travel-backend

# Copy env and start all services
cp .env.docker.example .env
docker-compose up --build
```

## Structure

```

backend/
├── src/
│ ├── main.ts # Điểm khởi động NestJS
│ ├── app.module.ts # Root module để import các module con
│
│ ├── config/ # Cấu hình toàn cục
│ │ ├── config.module.ts # Module load .env, config Gemini, DB
│ │ ├── env.validation.ts # Schema xác thực biến môi trường
│ │ └── gemini.config.ts # Config riêng cho Gemini AI
│
│ ├── modules/ # Chứa các module business
│ │ └── campaign/ # Module quản lý chiến dịch marketing
│ │ ├── campaign.module.ts # Định nghĩa module + provider
│ │ ├── domain/ # Logic nghiệp vụ thuần
│ │ │ ├── campaign.entity.ts # Entity: Campaign
│ │ │ └── value-objects/
│ │ │ └── campaign-status.vo.ts # ValueObject: Trạng thái chiến dịch
│ │ ├── application/ # Tầng orchestration (UseCase)
│ │ │ ├── use-cases/
│ │ │ │ ├── create-campaign.use-case.ts # Tạo chiến dịch
│ │ │ │ └── get-campaigns.use-case.ts # Lấy danh sách chiến dịch
│ │ │ └── ports/ # Interface để inject repo hoặc AI
│ │ │ ├── campaign.repository.ts
│ │ │ └── ai-generator.port.ts
│ │ └── infrastructure/
│ │ ├── controllers/
│ │ │ └── campaign.controller.ts # Xử lý HTTP request
│ │ ├── repositories/
│ │ │ └── prisma-campaign.repository.ts # Adapter cho DB
│ │ └── services/
│ │ └── gemini-ai.service.ts # Gọi Gemini API sinh nội dung
│
│ ├── infrastructure/ # Hạ tầng tổng thể
│ │ ├── database/
│ │ │ ├── prisma.service.ts # PrismaClient wrapper
│ │ │ └── schema.prisma # Định nghĩa cấu trúc DB
│ │ └── logger/ # Hệ thống log (Winston, Pino...)
│
│ ├── shared/ # Logic chia sẻ giữa các module
│ │ ├── base/ # Base entity, result monad
│ │ ├── exceptions/ # Exception tùy chỉnh
│ │ └── decorators/ # Guard, Interceptor, Decorator
│
│ └── tests/ # Unit và e2e tests
│ ├── unit/
│ └── e2e/

```

## Tour Structure

```

backend/src/modules/tour/
├── application/
│ ├── use-cases/
│ │ ├── create-tour.use-case.ts
│ │ ├── get-tour-detail.use-case.ts
│ │ └── list-tours.use-case.ts
│ └── ports/
│ └── tour.repository.ts ← Interface inject repository
│
├── domain/
│ ├── tour.entity.ts ← Entity định nghĩa fields + logic nghiệp vụ
│ └── value-objects/
│ └── tour-id.vo.ts ← ValueObject (nếu bạn cần ID, Date dạng riêng)
│
├── infrastructure/
│ ├── controllers/
│ │ └── tour.controller.ts ← Định nghĩa route HTTP
│ ├── repositories/
│ │ └── typeorm-tour.repository.ts ← Adapter kết nối DB (TypeORM)
│ └── dto/
│ ├── create-tour.dto.ts
│ └── book-tour.dto.ts
│
├── tour.module.ts ← Module tổng tour

```

## Auth Structure

```

src/modules/auth/
├── auth.module.ts
├── application/
│ ├── jwt.strategy.ts
│ ├── use-cases/
│ │ ├── register.use-case.ts
│ │ ├── login.use-case.ts
│ │ ├── change-password.use-case.ts ← Đổi mật khẩu
│ │ ├── forgot-password.use-case.ts ← Gửi token quên mật khẩu
│ │ └── reset-password.use-case.ts ← Đặt lại mật khẩu mới
├── domain/
│ └── user-role.enum.ts ← Enum định nghĩa vai trò user
├── infrastructure/
│ ├── controllers/
│ │ └── auth.controller.ts ← Xử lý các route auth
│ ├── guards/
│ │ ├── jwt-auth.guard.ts
│ │ └── roles.guard.ts
│ └── decorators/
│ └── roles.decorator.ts
└── dto/
├── login.dto.ts
├── register.dto.ts
├── change-password.dto.ts ← Body đổi mật khẩu
├── forgot-password.dto.ts ← Body gửi email quên mật khẩu
└── reset-password.dto.ts ← Body đặt lại mật khẩu

```

## Vai trò Mô tả quyền hạn chính

```

| admin | Toàn quyền quản lý tour, booking, người dùng, thống kê, cập nhật hệ thống
| staff | Nhân viên xử lý booking, xác nhận đơn đặt tour, liên hệ khách hàng
| guide | Hướng dẫn viên, xem lịch trình tour mình tham gia, xác nhận tham gia
| partner | Đại lý hoặc bên thứ ba đăng tour hoặc liên kết (nếu bạn muốn hỗ trợ tour affiliate)
| user | Người dùng bình thường: xem tour, đặt tour, xem lịch sử cá nhân
| guest | Chưa đăng nhập – chỉ có thể xem danh sách tour, không đặt

```

### Role Hierarchy

```

guest < user < guide < staff < admin

```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# codebase-be
