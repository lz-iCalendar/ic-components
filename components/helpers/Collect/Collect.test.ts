
import Collect, { CollectConsOptions } from './Collect';
import * as collectApi from './collectApi';
import { AxiosResponse } from 'axios';
import LzRequest from 'lz-request';

let spy: any;
beforeEach(() => {
  spy = jest.spyOn(collectApi, 'getFormSystemAccessTokenApi').mockImplementation(() => {
    const res: Promise<AxiosResponse<collectApi.Reponse<collectApi.GetFormSystemAccessTokenApiResponse>>> = Promise.resolve({
      data: {
        error: 0,
        message: '',
        data: {
          accessToken: 'formSystemAccessToken'
        }
      },
      status: 200,
      statusText: 'ok',
      headers: {},
      config: {}
    });
    return res;
  });
});

afterEach(() => {
  spy.mockReset();
  spy.mockRestore();
});


const initCollectInstance = async (): Promise<Collect> => {
  const formManagementResid = '111';
  const businessAPIBaseURL = 'http://localhost:5000';
  const businessAccessToken = 'businessAccessTooken';
  const options: CollectConsOptions = {
    businessAPIBaseURL,
    getBusinessAccessToken: () => businessAccessToken
  }
  const collect = new Collect(formManagementResid, options);
  await collect.init();
  return collect;
}


describe('Collect', () => {
  it('Collect constructor', async () => {
    const formManagementResid = '111';
    const businessAPIBaseURL = 'http://localhost:5000';
    const businessAccessToken = 'businessAccessTooken';
    const options: CollectConsOptions = {
      businessAPIBaseURL,
      getBusinessAccessToken: () => businessAccessToken
    }
    const collect = new Collect(formManagementResid, options);

    expect(collect).toEqual({
      formManagementResid,
      businessAPIBaseURL,
      businessAccessToken,
      formSystemAccessToken: ''
    });
  })

  it('Collect init', async () => {
    const collect = await initCollectInstance();
    expect(collect.formSystemAccessToken).toEqual('formSystemAccessToken');
  });


  it('Collect getFormCollect', async () => {
    const collect = await initCollectInstance();
    const formSystemAccessToken = 'formSystemAccessToken';

    expect(collect.formSystemAccessToken).toEqual(formSystemAccessToken);


  });




})