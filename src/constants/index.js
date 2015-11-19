import keyMirror from 'keyMirror';

export const LOCAL_STORAGE_TOKEN_KEY = 'payoneer.session.token';

export const ActionTypes = keyMirror({
	LOGIN_REQUESTED: null,
	LOGIN_SUCCESS: null,
	LOGIN_FAILED: null,
	LOGOUT: null,
  SET_CURRENCY: null,
  WITHDRAW_REQUESTED: null,
  WITHDRAW_SUCCESS: null,
  WITHDRAW_FAILED: null,
  SET_DRAWER_BACKGROUND: null,
  SET_HEADER_TITLE: null,
  DRAWER_OPEN: null,
  DRAWER_CLOSE: null,
  ACCOUNT_REQUESTED: null,
  ACCOUNT_SUCCESS: null,
  ACCOUNT_FAILED: null,
  TRANSACTIONS_REQUESTED: null,
  TRANSACTIONS_SUCCESS: null,
  TRANSACTIONS_FAILED: null,
  TRANSACTION_DETAIL_REQUESTED: null,
  TRANSACTION_DETAIL_SUCCESS: null,
  TRANSACTION_DETAIL_FAILED: null,
  PAYMENTS_REQUESTED: null,
  PAYMENTS_SUCCESS: null,
  PAYMENTS_FAILED: null,
  PAYMENT_DETAIL_REQUESTED: null,
  PAYMENT_DETAIL_SUCCESS: null,
  PAYMENT_DETAIL_FAILED: null,
});

export const API_Config = {
	baseUrl: 'https://mobileapi.sandbox.payoneer.com',
	appVersion: '3.31.0',
  mobileAppId: 1,
  languageCode: 1,
  deviceProperties: {
    DevicePrint: 'version=3.4.1.0_1&pm_fpua=mozilla/5.0 (windows nt 10.0; wow64) applewebkit/537.36 (khtml, like gecko) chrome/48.0.2564.109 safari/537.36|5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36|Win32&pm_fpsc=24|1920|1080|1040&pm_fpsw=&pm_fptz=2&pm_fpln=lang=en-US|syslang=|userlang=&pm_fpjv=0&pm_fpco=1&pm_fpasw=mhjfbmdgcfjbbpaeojofohoefgiehjai|pepflashplayer|internal-nacl-plugin|internal-pdf-viewer&pm_fpan=Netscape&pm_fpacn=Mozilla&pm_fpol=true&pm_fposp=&pm_fpup=&pm_fpsaw=1920&pm_fpspd=24&pm_fpsbd=&pm_fpsdx=&pm_fpsdy=&pm_fpslx=&pm_fpsly=&pm_fpsfse=&pm_fpsui=&pm_os=Windows&pm_brmjv=48&pm_br=Chrome&pm_inpt=&pm_expt=',
    DeviceToken: '0000000000000000000000000000000000000000',
    HttpAccept: 'application/json',
    HttpAcceptEncoding: '*',
    HttpAcceptLanguage: '*'
  },
  deviceId: '0000000000000000000000000000000000000000'
};

export const Currencies = [
  {
    name: 'USD',
    description: 'US DOLLAR',
    image: require('../../assets/images/currency/usd.png')
  },
  {
    name: 'EUR',
    description: 'US DOLLAR',
    image: require('../../assets/images/currency/eur.png')
  },
  {
    name: 'GBP',
    description: 'BRITISH POUND',
    image: require('../../assets/images/currency/gbp.png')
  },
  {
    name: 'INR',
    description: 'INDIAN RUPEE',
    image: require('../../assets/images/currency/inr.png')
  },
  {
    name: 'AUD',
    description: 'AUSTRALIAN DOLLAR',
    image: require('../../assets/images/currency/aud.png')
  },
  {
    name: 'CAD',
    description: 'CANADIAN DOLLAR',
    image: require('../../assets/images/currency/cad.png')
  },
  {
    name: 'SGD',
    description: 'SINGAPORE DOLLAR',
    image: require('../../assets/images/currency/sgd.png')
  },
  {
    name: 'CHF',
    description: 'SWISS FRANC',
    image: require('../../assets/images/currency/chf.png')
  },
  {
    name: 'MYR',
    description: 'MALAYSIAN RINGGIT',
    image: require('../../assets/images/currency/myr.png')
  },
  {
    name: 'JPY',
    description: 'JAPANESE YEN',
    image: require('../../assets/images/currency/jpy.png')
  },
  {
    name: 'CNY',
    description: 'CHINESE YUAN RENMINBI',
    image: require('../../assets/images/currency/cny.png')
  }
];

export const CardTypes = ['debit_card', 'bank_card', 'virtual_balance'];
