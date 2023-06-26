import { paths } from './generated/schema'; // (generated from openapi-typescript)
import createClient from './openapi-fetch';

export const { get, post, del, patch } = createClient<paths>({
  baseUrl: 'http://localhost:3000',
});
