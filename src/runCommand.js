import commands from '~/commands';

export default async function runCommand(commandString, args, message) {
  const Command = commands[commandString];
  if (!Command) return;

  const command = new Command(args, message);

  command.run();
}
