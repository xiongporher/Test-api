import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty({ description: 'product name' })
    name: string;

    @ApiProperty({ description: 'type_id name' })
    type_id: number;

    @ApiProperty({ description: 'price' })
    price: number;

    @ApiProperty({ description: 'qty' })
    qty: string;

    @ApiProperty({ description: 'view' })
    view: string;

}
