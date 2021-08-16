

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
    dueDate: string;
    description: string;
  },
  items: InvoiceItem[];
}