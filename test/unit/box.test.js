import test from 'ava';
import * as box from '../../src/js/components/box';

test('youtubeRegex', (t) => {
  t.is(box.youtubeRegex.test('https://www.youtube.com/embed/My4j3vgFxbE'), true);
  t.is(box.youtubeRegex.test('https://www.youtube.com/watch?v=SDrPghDvYA4'), true);
  t.is(box.youtubeRegex.test('https://www.youtube.com/watch?v=HSctxkPU0x0&index=30&list=PLQcgQjahVPeVnpNn3VJ-p5v-CrHKfEJta'), true);
  t.is(box.youtubeRegex.test('https://youtu.be/dH3GSrCmzC8'), true);
});
