import test from 'ava';
import * as utils from '../../src/js/components/utils';

test('updateQueryString', (t) => {
  t.is(utils.updateQueryString('https://example.com/demo', 'darkli', 'content1'), 'https://example.com/demo?darkli=content1');
  t.is(utils.updateQueryString('https://example.com/darkli', 'darkli', 'content1'), 'https://example.com/darkli?darkli=content1');
  t.is(utils.updateQueryString('https://example.com/demo?para=1', 'darkli', '948794'), 'https://example.com/demo?para=1&darkli=948794');
});

test('getQueryString', (t) => {
  t.is(utils.getQueryString('darkli', 'https://example.com/demo'), null);
  t.is(utils.getQueryString('darkli', 'https://example.com/demo?darkli'), '');
  t.is(utils.getQueryString('darkli', 'https://example.com/demo?darkli=t1'), 't1');
  t.is(utils.getQueryString('darkli', 'https://example.com/demo?para=1&darkli=ok'), 'ok');
});
