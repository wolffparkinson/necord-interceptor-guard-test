import { NecordModule } from 'necord'
import { Module } from '@nestjs/common'
import { GatewayIntentBits } from 'discord.js'
import { AppCommands } from './app.commands'
import { AppUpdate } from './app.update'

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
  ]
})
export class AppModule {}
