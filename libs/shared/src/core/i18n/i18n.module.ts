import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      resolvers: [AcceptLanguageResolver],
      loaderOptions: {
        path: [join(__dirname, '../../i18n/')],
        watch: true,
      },
    }),
  ],
  exports: [I18nModule],
})
export class I18nSharedModule {}
