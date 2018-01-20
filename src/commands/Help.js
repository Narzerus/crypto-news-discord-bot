import Command from '~/commands/Command';

export default class SetRank extends Command {
  static args = [];
  static permissionsRequired = [];

  async runCommand(__, { guild: { channel } }) {
    channel.send('This is a placeholder help command.');
  }
}
