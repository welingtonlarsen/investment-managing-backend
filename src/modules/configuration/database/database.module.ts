import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const result = await import('./datasource');
        return result.options;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export default class DatabaseModule {}
