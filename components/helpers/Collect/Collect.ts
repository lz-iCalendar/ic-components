import { getFormSystemAccessTokenApi } from './collectApi';
import LzRequest from 'lz-request';

import formSystemApi from 'form-system';


export type CollectConsOptions = {
  businessAPIBaseURL: string;
  getBusinessAccessToken: () => string;
}

export type FormManagementRecord = {
  formManageId?: string;
  sourceobjectid?: string;
  formTitle?: string;
  formName?: string;
  formResid?: string;
  isApplyFormMust?: boolean;
  isApplyFormEnabled?: boolean;
  collectType?: '本表' | '子表' | '自定义';
  collectorResid?: string;
  collectorRecidColName?: string;
}

export default class Collect {
  constructor(formManagementResid: string, options: CollectConsOptions) {
    this.formManagementResid = formManagementResid;
    this.businessAccessToken = options.getBusinessAccessToken();
    this.businessAPIBaseURL = options.businessAPIBaseURL;

    this.lzRequest = new LzRequest({
      baseURL: this.businessAPIBaseURL,
      getAccessToken: () => this.businessAccessToken
    });

    this.formSystemApiConfig = new formSystemApi.Configuration({ accessToken: this.formSystemAccessToken });

  }

  formSystemApiConfig: formSystemApi.Configuration = null;

  businessAPIBaseURL = '';
  formManagementResid = '';
  businessAccessToken = '';

  formSystemAccessToken = '';

  lzRequest: LzRequest = null;

  async init() {
    const res = await getFormSystemAccessTokenApi(this.businessAPIBaseURL, this.businessAccessToken);
    this.formSystemAccessToken = res.data.data.accessToken;
  }

  async getFormCollect(sourceobjectid: string): Promise<FormManagementRecord[]> {
    const res = await this.lzRequest.getTable<FormManagementRecord>({ resid: this.formManagementResid, cmswhere: `sourceobjectid = ${sourceobjectid}` });
    return res?.data?.data;
  }

  async getFormDetailByFormResid(formResid: string) {
    // const { ... } = new formSystemApi.FormsApi(this.formSystemApiConfig);
    // TODO: 缺少 “通过 formId 获取表单信息” 接口，文档地址：https://thoughts.teambition.com/workspaces/6052c9e50bb099004745e277/docs/6052cbb64cc58300010aeb62?scroll-to-block=60c6097b91c6c500467bb067

    // TODO: 
    // const api = new formSystemApi.FormFieldsApi(this.formSystemApiConfig);
    // api.formFieldsIndex(formId);
    return {

    }
  }

  async addFormCollect(record: FormManagementRecord) {
    // 添加空表单，得到 formResid
    const { formsCreate } = new formSystemApi.FormsApi(this.formSystemApiConfig);
    // 返回的数据结构是什么？
    // const { resid } = await formsCreate({
    //   mode: 0,
    // })

    // record.formResid = ...

    const res = await this.lzRequest.addRecords<FormManagementRecord>(this.formManagementResid, [record]);
    return res;
  }

  // async get


}