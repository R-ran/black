// PayPal SDK 类型定义
export interface PayPalOrderData {
  orderID?: string;
  payerID?: string;
  paymentID?: string;
}

export interface PayPalOrderActions {
  order: {
    create: (order: PayPalOrderRequest) => Promise<string>;
    capture: () => Promise<PayPalOrderDetails>;
  };
}

export interface PayPalOrderRequest {
  purchase_units: Array<{
    amount: {
      value: string;
      currency_code: string;
    };
    description?: string;
  }>;
}

export interface PayPalOrderDetails {
  id: string;
  status: string;
  payer?: {
    name?: {
      given_name?: string;
      surname?: string;
    };
    email_address?: string;
  };
}

export interface PayPalButtonsOptions {
  style?: {
    layout?: "vertical" | "horizontal";
    color?: "gold" | "blue" | "silver" | "white" | "black";
    shape?: "rect" | "pill";
    label?: "paypal" | "checkout" | "buynow" | "pay" | "installment";
  };
  fundingSource?: string;
  createOrder: (data: PayPalOrderData, actions: PayPalOrderActions) => Promise<string>;
  onApprove: (data: PayPalOrderData, actions: PayPalOrderActions) => Promise<void>;
  onError?: (err: Error) => void;
}

export interface PayPalSDK {
  Buttons: (options: PayPalButtonsOptions) => {
    render: (container: string) => void;
  };
}

// Apple Pay 类型定义
export interface ApplePayPaymentRequest {
  countryCode: string;
  currencyCode: string;
  supportedNetworks: string[];
  merchantCapabilities: string[];
  total: {
    label: string;
    amount: string;
  };
  lineItems?: Array<{
    label: string;
    amount: string;
  }>;
}

export interface ApplePayValidateMerchantEvent {
  validationURL: string;
}

export interface ApplePayPaymentAuthorizedEvent {
  payment: {
    token: {
      paymentData: unknown;
      paymentMethod: {
        displayName: string;
        network: string;
        type: string;
      };
      transactionIdentifier: string;
    };
  };
}

export interface ApplePayMerchantSession {
  epochTimestamp: number;
  expiresAt: number;
  merchantSessionIdentifier: string;
  nonce: string;
  merchantIdentifier: string;
  domainName: string;
  displayName: string;
}

export interface ApplePaySession {
  STATUS_SUCCESS: number;
  STATUS_FAILURE: number;
  canMakePayments: () => boolean;
  onvalidatemerchant: (event: ApplePayValidateMerchantEvent) => void;
  onpaymentauthorized: (event: ApplePayPaymentAuthorizedEvent) => void;
  oncancel: () => void;
  completeMerchantValidation: (merchantSession: ApplePayMerchantSession) => void;
  completePayment: (status: number) => void;
  abort: () => void;
  begin: () => void;
}

export interface ApplePaySessionConstructor {
  new (version: number, request: ApplePayPaymentRequest): ApplePaySession;
  canMakePayments: () => boolean;
  STATUS_SUCCESS: number;
  STATUS_FAILURE: number;
}

declare global {
  interface Window {
    paypal?: PayPalSDK;
    ApplePaySession?: ApplePaySessionConstructor;
  }
}

