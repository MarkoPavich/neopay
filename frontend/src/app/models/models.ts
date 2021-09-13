import { PaymentTerms } from "../enums/enums"

export type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
}

export type Invoice = {
  id: string;
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
  },
  items: InvoiceItem[];
}

export type LoginForm = {
  username: string;
  password: string;
}

export type User = {
  id: string;
  username: string;
  email: string;
}

export type SessionModel = {
  user: User | null;
  token: string;
  expires: string;
}