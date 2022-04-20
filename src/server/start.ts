import server from './app';
import init from './init';

const port = process.env.PORT || 5000;
server.listen(port, () => {
  init();
  // eslint-disable-next-line no-console
  console.info(`[server] ⚡️ ready @:${port} (${__dirname})`);
});
