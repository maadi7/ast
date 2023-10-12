import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { WeatherService } from './weather.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AppService } from './app.service';



@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  controllers: [AuthController],
  providers: [TelegramService, WeatherService, GoogleStrategy, AppService],
  exports: [PassportModule],
})
export class AppModule {}
