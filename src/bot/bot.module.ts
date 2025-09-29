import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';

@Module({
	imports: [
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TelegrafModule.forRoot({
			token: process.env.BOT_TOKEN!
		})
	],
	providers: [BotUpdate]
})
export class BotModule {}
