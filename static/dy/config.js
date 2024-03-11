const isAndroid = () => /Android/i.test(navigator.userAgent);
const isiPhone = () => /iPhone/i.test(navigator.userAgent);
const isiPad = () => /iPad/i.test(navigator.userAgent);

self.__dynamic$config = {
  prefix: '/a/q/',
  encoding: 'xor',
  mode: 'production',
  logLevel: 0,
  bare: {
    version: 2,
    path: '/v/',
  },
  tab: {
    title: null,
    icon: null,
    ua: isAndroid()
      ? 'Mozilla/5.0 (Linux; Android 10; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0'
      : isiPad()
      ? 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/604.1'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  },
  assets: {
    prefix: '/dy/',
    files: {
      handler: 'handler.js',
      client: 'client.js',
      worker: 'worker.js',
      config: 'config.js',
      inject: function () {
        navigator.__defineGetter__('userAgent', () =>
          isiPhone()
            ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
            : isiPad()
            ? 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/604.1'
            : isAndroid()
            ? 'Mozilla/5.0 (Linux; Android 10; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0'
            : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        );
      },
    },
  },
  block: [],
};
