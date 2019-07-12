import { callApi } from '../helpers/apiHelper';
import {  IfightersPick} from '../Interfaces';

class FighterService {
  async getFighters(): Promise<IfightersPick[]> {
    try {
      const endpoint: string = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id): Promise<object> {
    try {
      const endpoint: string = `details/fighter/${_id}.json`;
      const apiResult = await callApi(endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
