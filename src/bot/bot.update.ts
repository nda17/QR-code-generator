import { Update, Ctx, On, Start } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import * as QRCode from 'qrcode';

@Update()
export class BotUpdate {
	@Start()
	async onStart(@Ctx() ctx: Context) {
		const user = ctx.from;

		await ctx.reply(
			`Привет, ${user ? user.first_name : 'Пользователь'} 👋!\nОтправь мне все ii, EAN, DEF, EDM  через запятую, и я сгенерирую для каждого QR-код.\n\nНапример:\n` +
				`ii1233212, EAN_1312312412, EDM_3312312DSDA12`
		);
	}

	@On('text')
	async onMessage(@Ctx() ctx: Context) {
		const text =
			ctx.message && 'text' in ctx.message ? ctx.message.text : '';
		const inputs = text.split(',').map(t => t.trim());

		for (const input of inputs) {
			// Генерируем PNG в буфер
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
			const buffer = await QRCode.toBuffer(input, {
				type: 'png',
				margin: 1,
				width: 600
			});

			await ctx.replyWithDocument({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				source: buffer,
				filename: `${input}.png`
			});
		}
	}
}
