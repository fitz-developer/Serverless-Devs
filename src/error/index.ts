/** @format */
import { red, bgRed } from '../utils/common';
import { getConfig } from '../utils/handler-set-config';
import getCore from '../utils/s-core';
const { colors, report, getMAC } = getCore();
const pkg = require('../../package.json');
export { CommandError } from './command-error';
export { ConfigDeleteError } from './config-delete-error';
export { ConfigError } from './config-error';
export { ConfigGetError } from './config-get-error';
export { InitError } from './init-error';
export { ServerlessError } from './serverless-error';

const pid = getMAC().replace(/:/g, '');

function underline(prefix: string, link: string) {
  return `${colors.gray(prefix)}${colors.gray.underline(link)}`;
}
export function handleError(error: Error, prefix = 'Message:', exit = true) {
  const traceId = `${pid}${Date.now()}`;
  console.log(red(`✖ ${prefix}\n`));
  const analysis = getConfig('analysis');
  if (analysis !== 'disable') {
    console.log(colors.gray(`TraceId:     ${traceId}`));
  }
  console.log(
    colors.gray(
      `Environment: ${pkg.name}: ${pkg.version}, ${process.platform}-${process.arch}, node-${process.version}`,
    ),
  );
  console.log(underline('Documents:   ', 'https://www.serverless-devs.com'));
  console.log(underline('Discussions: ', 'https://github.com/Serverless-Devs/Serverless-Devs/discussions'));
  console.log(underline('Issues:      ', 'https://github.com/Serverless-Devs/Serverless-Devs/issues\n'));
  console.log(bgRed('ERROR:'));
  console.log(error);
  console.log('');
  if (analysis !== 'disable') {
    console.log(colors.gray(`Please copy traceId: ${traceId} and join Dingding group: 33947367 for consultation.`));
  }
  console.log(colors.gray("Run again with the '--debug' option or 's -h' to get more logs."));
  report({
    type: 'jsError',
    content: error,
    traceId,
  }).then(() => exit && process.exit(-1));
}
