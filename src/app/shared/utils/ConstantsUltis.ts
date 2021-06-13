export class ConstantsUltis {


  public static FIND_ALL_BUSINESS = 'https://60820a0e827b350017cfbaea.mockapi.io/api/v1/itau_teste';
  public static FIND_ONE_BUSINESS = 'https://60820a0e827b350017cfbaea.mockapi.io/api/v1/itau_teste/';
  public static URL_FAKE_API = 'http://localhost:3000/ibusiness';
  public static BUSISNESS_ROUTER_DESCRISTION_CREATE_UPDATE = 'createupdate';
  public static BUSISNESS_ROUTER_DESCRISTION_DETAILS = 'details';
  public static PATH_VIA_CEP = 'https://viacep.com.br/ws/';

  public static getParamDescrition(route: any, descriptio: string ): boolean {
    return !!route.snapshot.routeConfig?.path?.startsWith(descriptio);
  }

  public static cleanValue(value: string){
    return (value) && value.toString().replace(/\D/g, '');
  }
}
