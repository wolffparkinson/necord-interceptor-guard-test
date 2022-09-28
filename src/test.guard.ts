import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { NecordExecutionContext } from 'necord'
import { Observable } from 'rxjs'

@Injectable()
export class TestGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [interaction] =
      NecordExecutionContext.create(context).getContext<'interactionCreate'>()

    if (interaction.isRepliable())
      await interaction.reply('message from TestGuard')

    return false
  }
}
