const path = require('path');
const spawn = require('cross-spawn');
const httpServer = require('http-server');
const server = httpServer.createServer({
  root: path.resolve(__dirname, '../../demo')
});

server.listen(8000);

let args = process.argv.slice(2);
if(args.indexOf('--config') === -1) {
  args = args.concat(['--config', 'test/e2e/nightwatch.conf.js']);
}
if(args.indexOf('--env') === -1) {
  args = args.concat(['--env', 'chrome'])
}

const runner = spawn('./node_modules/.bin/nightwatch', args, {
  stdio: 'inherit',
});

runner.on('exit', function(code) {
  server.close();
  process.exit(code);
});

runner.on('error', function(err) {
  server.close();
  throw err;
});
