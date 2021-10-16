namespace NeoPay.Data.Entities
{
    public record InvoiceItem
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public float Quantity { get; init; }
        public float Price { get; init; }
    }
}
