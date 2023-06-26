import { getUserId } from './get-user-id';

describe('get-user-id', () => {
  it('should return the correct id when providing a header', () => {
    const headers = { 'x-user-id': '5' };
    const userId = getUserId({ headers });
    expect(userId).toEqual('5');
  });

  it('should return the correct id when providing cookies', () => {
    const cookies = { 'x-user-id': '5' };
    const userId = getUserId({ cookies });
    expect(userId).toEqual('5');
  });

  it('should prefer the header over a cookie', () => {
    const cookies = { 'x-user-id': '5' };
    const headers = { 'x-user-id': '10' };
    const userId = getUserId({ cookies, headers });
    expect(userId).toEqual('10');
  });
});
