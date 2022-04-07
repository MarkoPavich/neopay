using Microsoft.EntityFrameworkCore.Migrations;

namespace NeoPay.Data.Migrations
{
    public partial class RefreshTokenIp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientIpAddress",
                table: "RefreshTokens",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientIpAddress",
                table: "RefreshTokens");
        }
    }
}
