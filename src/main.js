import logger from 'winston';

import { BOT_PREFIX } from '~/constants';
import runCommand from '~/runCommand';
import bot from '~/bot';

function onError(err) {
  logger.error(err);
}

bot.on('ready', () => {
  logger.info('Bot connected.');
});

bot.on('message', message => {
  const { author, content } = message;
  logger.info(`Received new message: ${message.id}`);
  const userIsBot = author.equals(bot.user);
  const prefixFound = content.startsWith(BOT_PREFIX);

  if (userIsBot || !prefixFound) return;

  const args = content.substring(BOT_PREFIX.length).split(' ');
  const command = args.shift();

  if (!command) return;

  runCommand(command, args, message).catch(onError);
});

bot.login(process.env.DISCORD_BOT_TOKEN);
