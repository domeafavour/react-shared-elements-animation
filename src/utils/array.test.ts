import { arrayPush } from './array';

describe('array', () => {
  it('should be [1,2,3]', () => {
    expect(arrayPush([1, 2], 3)).toEqual([1, 2, 3]);
  });
});
