import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { WeatherService } from './weather.service';

@Injectable()
export class TelegramService {
  private bot: Telegraf;
  private subscribers: Set<number> = new Set(); // In-memory storage for subscribed users

  constructor(private readonly weatherService: WeatherService) {
    this.bot = new Telegraf('6466058813:AAH1cPPpFx_gpRONbvPFTpjzPA_7qPzL8YM');
    this.setupBotCommands();
  }

  private setupBotCommands() {
    this.bot.command('subscribe', (ctx) => {
      const userId = ctx.from.id;
      this.subscribers.add(userId);
      ctx.reply('You have been subscribed to weather updates!');
    });

    this.bot.command('unsubscribe', (ctx) => {
      const userId = ctx.from.id;
      this.subscribers.delete(userId);
      ctx.reply('You have been unsubscribed from weather updates.');
    });

    // this.bot.command('weather', (ctx) => {
    //   ctx.reply('Please specify the city for weather updates, e.g., /weather London');
    // });

    this.bot.hears(/\/weather (.+)/, async (ctx) => {
      const city = ctx.match[1];
      const userId = ctx.from.id;

      if (this.subscribers.has(userId)) {
        try {
          const weatherData = await this.weatherService.getWeatherInfo(city, '138cd291a1233f11960ed85cff231085');
          const temperature = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          ctx.reply(`Weather in ${city}: ${temperature}°C, ${description}`);
        } catch (error) {
          ctx.reply('Failed to fetch weather data. Please try again later.');
        }
      } else {
        ctx.reply('You are not subscribed to weather updates. Type /subscribe to subscribe.');
      }
    });

    this.bot.launch().then(() => {
      console.log('Telegram bot has started');
    });
  }
}
