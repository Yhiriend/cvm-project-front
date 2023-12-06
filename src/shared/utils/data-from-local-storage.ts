import { environment } from '../../environments/environment.development';
import { decryptData } from './datahelper';

export const getDataFromLocalStorage = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('throw_data_running', 'dS@%Rwey)hCd5DZKP87jkVdm');
    const dataStorage = localStorage.getItem('token');
    let decryptedData: any = {};
    if (dataStorage) {
      decryptedData = decryptData(
        JSON.parse(dataStorage),
        environment.secretKey
      );
    }
    return decryptedData;
  } else {
    console.error('localStorage no está disponible en este entorno.');
    return {};
  }
};
