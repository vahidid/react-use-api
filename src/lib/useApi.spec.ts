import test from 'ava';

import useApi from './useApi';

const GetPostsService = () =>
  fetch(`https://gorest.co.in/public/v2/posts`, {
    method: 'GET',
  });

test('get posts with api call', async (t) => {
  const getPostsApi = useApi(GetPostsService);

  const response = await getPostsApi.request();

  console.log(response);
  t.is(2, 4);
});

test('power', (t) => {
  t.is(2 * 4, 16);
});
