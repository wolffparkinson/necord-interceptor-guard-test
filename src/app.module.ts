import { NecordModule } from 'necord'
import { Module } from '@nestjs/common'
import { GatewayIntentBits } from 'discord.js'
import { AppCommands } from './app.commands'
import { AppUpdate } from './app.update'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ErrorsInterceptor } from './errors.interceptor'

@Module({
  imports: [
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      development: [process.env.DISCORD_DEV_GUILD_ID],
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
    })
  ],
  providers: [
    AppUpdate,
    AppCommands,
    { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }
  ]
})
export class AppModule {}
