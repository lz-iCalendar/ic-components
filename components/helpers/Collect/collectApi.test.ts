import axios from 'axios';
import nock from 'nock';
import { getFormSystemAccessTokenApi } from './collectApi'
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('collectApi', () => {
  it('getFormSystemAccessTokenApi', async () => {
    const baseURL = 'http://localhost:5000';
    const accessToken = 'businessAccessToken';

    const resData = {
      error: 0,
      message: '',
      data: {
        accessToken: 'formSystemAccessToken'
      }
    }

    const scope = nock('http://localhost:5000')
      .get('/api/v1/formSystem/sessions')
      .reply(200, function () {
        const { accesstoken } = this.req.headers;
        if (accesstoken === accessToken) {
          return resData;
        }
        return {}
      });

    const res = await getFormSystemAccessTokenApi(baseURL, accessToken);

    expect(res.data).toEqual(resData)

    scope.done()
    nock.restore();
  })
})