import { Injectable, UseGuards } from '@nestjs/common'
import { Context, SlashCommand, SlashCommandContext } from 'necord'
import { TestGuard } from './test.guard'

@Injectable()
export class AppCommands {
  @UseGuards(TestGuard)
  @SlashCommand({
    name: 'hello',
    description: 'world'
  })
  public helloWorldCommand(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({
      ephemeral: true,
      content: 'Hello World'
    })
  }
}
