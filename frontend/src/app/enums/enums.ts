export enum PaymentTerms {
  Net1Day,
  Net7Day,
  Net14Day,
  Net30Day,
}

export enum InvoiceStatus {
  draft,
  pending,
  paid,
}

export const PaymentTermsStringRep = {
  [PaymentTerms.Net1Day]: 'Net 1 Day',
  [PaymentTerms.Net7Day]: 'Net 7 Days',
  [PaymentTerms.Net14Day]: 'Net 14 Days',
  [PaymentTerms.Net30Day]: 'Net 30 Days',
};
