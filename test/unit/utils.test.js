import test from 'ava';
import * as utils from '../../src/js/components/utils';

test('updateQueryString', (t) => {
  t.is(utils.updateQueryString({
    search: '',
    key: 'darkli',
    val: 'content1',
  }), 'darkli=content1');

  t.is(utils.updateQueryString({
    search: 'para=1',
    key: 'darkli',
    val: '948794',
  }), 'para=1&darkli=948794');

  t.is(utils.updateQueryString({
    search: 'darkli=ddd',
    key: 'darkli',
    val: '123',
  }), 'darkli=123');
});

test('getQueryString', (t) => {
  const stubs = [
    {
      key: 'darkli',
      search: '',
      expectOutput: null,
    },
    {
      key: 'darkli',
      search: 'darkli',
      expectOutput: '',
    },
    {
      key: 'darkli',
      search: 'darkli=t1',
      expectOutput: 't1',
    },
    {
      key: 'darkli',
      search: 'para=1&darkli=ok',
      expectOutput: 'ok',
    },
    {
      key: 'darkli',
      search: 'darkli=a&darkli=b',
      expectOutput: 'a',
    },
  ];

  t.plan(stubs.length);
  stubs.forEach((stub) => {
    t.is(utils.getQueryString(stub.key, stub.search), stub.expectOutput);
  });
});
