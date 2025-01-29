import { Module } from '@nestjs/common';
// import { ClsModule } from 'nestjs-cls';
// import { ClsPluginTransactional } from '@nestjs-cls/transactional';
// import { DatabaseModule } from '@app/coin-flip-shared/database/database.module';
// import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
// import { DatabaseService } from '@app/coin-flip-shared/database/database.service';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { I18nSharedModule } from '@app/shared/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({
      delimiter: ':',
    }),
    /*    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [DatabaseModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: DatabaseService,
          }),
        }),
      ],
      global: true,
      middleware: { mount: true },
    }),*/
    I18nSharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
