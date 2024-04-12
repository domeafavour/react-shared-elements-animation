import { createSharedIdPattern } from './createSharedIdPattern';

describe('createSharedIdPattern', () => {
  it('should return true if pattern is equal to sharedId, return false otherwise.', () => {
    const { match, matchParams, isMatched, generate } =
      createSharedIdPattern('header');
    expect(match('header')).toBe(true);
    expect(match('header2')).not.toBe(true);
    expect(isMatched('header')).toBe(true);
    expect(matchParams('header')).toEqual({});
    expect(generate({})).toBe('header');
  });

  it('should match id', () => {
    const { match, isMatched, matchParams, generate } = createSharedIdPattern<{
      id: string;
    }>('photo/:id');
    expect(match('photo/1', { id: '1' })).toBe(true);
    expect(match('photo/1', { id: '2' })).not.toBe(true);
    expect(match('photo/1')).not.toBe(true);
    expect(match('photo/:id')).toBe(true);
    expect(match('photo/:id', { id: ':id' })).toBe(true);

    expect(isMatched('photo/1')).toBe(true);

    expect(matchParams('photo/1')).toEqual({ id: '1' });

    expect(generate({ id: '1' })).toBe('photo/1');
  });

  it('should match multiple params', () => {
    const { match, isMatched, matchParams, generate } = createSharedIdPattern<{
      id: string;
      name: string;
    }>('photo/:id/detail/:name');
    expect(match('photo/1/detail/2', { id: '1', name: '2' })).toBe(true);
    expect(match('photo/1/detail/2', { id: '1', name: '3' })).not.toBe(true);
    expect(match('photo/1/detail/2')).not.toBe(true);
    expect(match('photo/:id/detail/:name')).toBe(true);
    expect(match('photo/:id/detail/:name', { id: ':id', name: ':name' })).toBe(
      true
    );

    expect(isMatched('photo/1/detail/2')).toBe(true);
    expect(isMatched('photo/1/detail/3')).toBe(true);

    expect(matchParams('photo/1/detail/2')).toEqual({ id: '1', name: '2' });

    expect(generate({ id: '1', name: '2' })).toBe('photo/1/detail/2');
  });
});
