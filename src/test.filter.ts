import { ArgumentsHost, Catch, ExceptionFilter,ForbiddenException, Logger } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { SlashCommandContext } from 'necord';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ForbiddenExceptionFilter.name);
  
  async catch(exception: Error, host: ArgumentsHost) {
    const [interaction] = host.getArgByIndex<SlashCommandContext>(0) ?? [
      undefined,
    ];
    const message = {embeds:[new EmbedBuilder().setColor('Red').setTitle('Error').setDescription(`${exception.message}`)]};
    this.logger.error(exception);
    if (interaction.deferred) {
      await interaction.editReply(message);
    } else if (interaction.replied) {
      interaction.followUp({ ...message, ephemeral: true });
    } else {
      await interaction.reply({ ...message, ephemeral: true });
    }
  }
}
