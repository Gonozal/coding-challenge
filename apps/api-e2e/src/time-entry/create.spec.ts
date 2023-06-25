import axios, { AxiosError } from 'axios';

describe('POST /api/time-entry', () => {
  let userId: string;

  beforeAll(async () => {
    const email = `${Math.random().toString()}@example.com`;
    // create a new user so we can reference it's ID
    const res = await axios.post(`/api/user`, { email });

    userId = res.data.id;

    axios.defaults.headers.common = {
      'x-user-id': userId,
    };
  });

  it('should return a 201 status', async () => {
    const startedAt = new Date().toISOString();
    const finishedAt = new Date().toISOString();
    try {
      const res = await axios.post(`/api/time-entry`, {
        finishedAt,
        startedAt,
      });

      expect(res.status).toBe(201);
    } catch (e) {
      const error = e as AxiosError;

      console.log(error.request);

      console.log(error.response);
    }
  });

  it('should return the timestamps it was created with', async () => {
    const startedAt = new Date().toISOString();
    const finishedAt = new Date().toISOString();
    const res = await axios.post(`/api/time-entry`, {
      startedAt,
      finishedAt,
    });

    expect(res.data.startedAt).toEqual(startedAt);
    expect(res.data.finishedAt).toEqual(finishedAt);
  });

  it('should return the userId of the user that created the entry', async () => {
    const startedAt = new Date().toISOString();
    const finishedAt = new Date().toISOString();
    const res = await axios.post(`/api/time-entry`, {
      startedAt,
      finishedAt,
    });

    expect(res.data.user.id).toEqual(userId);
  });
});
