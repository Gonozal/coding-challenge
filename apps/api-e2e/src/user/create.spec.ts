import axios, { AxiosError } from 'axios';

describe('POST /api/user', () => {
  let email: string;

  beforeEach(() => {
    email = `${Math.random().toString()}@example.com`;
  });

  it('should return a 201 status', async () => {
    const res = await axios.post(`/api/user`, { email });

    expect(res.status).toBe(201);
  });

  it('should return a user with the email it was created with', async () => {
    const res = await axios.post(`/api/user`, { email });

    expect(res.data).toEqual(expect.objectContaining({ email }));
  });

  it('should return an error message if no email was provided', async () => {
    expect.assertions(2);
    try {
      await axios.post(`/api/user`, {});
    } catch (e) {
      const error = e as AxiosError;
      expect(error).toBeInstanceOf(AxiosError);
      expect(error.response?.status).toBe(400);
    }
  });

  it('should return an error message if an additional attribute is provided', async () => {
    expect.assertions(2);
    try {
      await axios.post(`/api/user`, { email, additional: 'attribute' });
    } catch (e) {
      const error = e as AxiosError;
      expect(error).toBeInstanceOf(AxiosError);
      expect(error.response?.status).toBe(400);
    }
  });
});
