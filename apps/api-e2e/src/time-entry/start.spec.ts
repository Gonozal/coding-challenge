import axios from 'axios';

describe('POST /api/time-entry/start', () => {
  beforeAll(async () => {
    const email = `${Math.random().toString()}@example.com`;
    // create a new user so we can reference it's ID
    const res = await axios.post(`/api/user`, { email });

    axios.defaults.headers.common = {
      'x-user-id': res.data.id,
    };
  });

  it('should return a 201 status', async () => {
    const res = await axios.post(`/api/time-entry/start`);

    expect(res.status).toBe(201);
  });

  it('should automatically set the created time', async () => {
    const beforeRequest = new Date().getTime();
    const res = await axios.post(`/api/time-entry/start`);
    const afterRequest = new Date().getTime();

    expect(new Date(res.data.startedAt).getTime()).toBeGreaterThanOrEqual(
      beforeRequest
    );
    expect(new Date(res.data.startedAt).getTime()).toBeLessThanOrEqual(
      afterRequest
    );
  });
});
