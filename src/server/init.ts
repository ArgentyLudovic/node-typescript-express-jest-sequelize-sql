/* eslint-disable no-console */

export default () => {
  // generic error handlers
  process.on('uncaughtException', (error: Error) => {
    console.error('[uncaught error:]');
    console.error(error);
    console.error(error.stack);
    process.exit(1); // mandatory (as per the Node.js docs)
  });
  process.on('unhandledRejection', (error: Error) => {
    console.error('[unhandled rejection]:');
    console.error('[uncaught error:]');
    console.error(error);
    console.error(error.stack);
  });
};
