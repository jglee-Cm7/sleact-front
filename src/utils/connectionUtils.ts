interface ErrorStatusHandler {
  status: number;
  data: {
    stateCode: "WITHDRAWAL" | "DISABLED";
  };
}
export const errorStatusHandler = ({ status, data }: ErrorStatusHandler) => {
  switch (status) {
    case 400:
      // console.log('Bad request');
      break;
    case 401:
      // console.log('unauthorized');
      break;
    case 403:
      // console.log('access denied');
      const userStateCode = data.stateCode;
      switch (userStateCode) {
        case "WITHDRAWAL": // 탈퇴
          break;
        case "DISABLED": // 정지
          break;
        default:
          break;
      }
      break;
    case 404:
      // console.log('Request error, the resource was not found');
      break;
    case 405:
      // console.log('Request method not allowed');
      break;
    case 408:
      // console.log('Request timed out');
      break;
    case 500:
      // console.log('Server-side error');
      break;
    case 501:
      // console.log('Network not implemented');
      break;
    case 502:
      // console.log('Network Error');
      break;
    case 503:
      // console.log('service is not available');
      break;
    case 504:
      // console.log('network timeout');
      break;
    case 505:
      // console.log('http version does not support the request');
      break;
    default:
      // console.log(`connection error ${status}`);

      break;
  }
};
