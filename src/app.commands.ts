import { Injectable, UseFilters, UseGuards } from '@nestjs/common'
import { Context, SlashCommand, SlashCommandContext } from 'necord'
import { ForbiddenExceptionFilter } from './test.filter'
import { TestGuard } from './test.guard'

@Injectable()
export class AppCommands {
  @UseGuards(TestGuard)
  @UseFilters(ForbiddenExceptionFilter)
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
