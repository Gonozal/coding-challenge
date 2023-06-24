import axios from 'axios';

describe('GET /api/user', () => {
  it('should return all users', async () => {
    const res = await axios.get<Array<unknown>>(`/api/user`);

    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThanOrEqual(0);
  });
});
