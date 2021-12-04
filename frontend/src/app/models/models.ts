import { InvoiceStatus, PaymentTerms } from '../enums/enums';

export type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  id: string;
  status: InvoiceStatus;
  billFrom: {
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  billTo: {
    clientName: string;
    clientEmail: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
    invoiceDate: string;
    dueDate: PaymentTerms;
    description: string;
  };
  items: InvoiceItem[];
};

export type LoginForm = {
  username: string;
  password: string;
};

export type RegistrationForm = {
  username: string;
  password: string;
  email: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
};

export type SessionModel = {
  user: User | null;
  token: string;
  expires: string;
};

export type GoogleSignInResponse = {
  authToken: string;
  email: string;
  firstName: string;
  id: string;
  idToken: string;
  lastName: string;
  name: string;
  photoUrl: string;
  provider: string;
  response: any;
};