

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
    postCOde: string;
    country: string;
  };
  billTo: {
    clientName: string;
    clientEmail: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
    date: string;
    terms: string;
    description: string;
  },
  items: InvoiceItem[];
}