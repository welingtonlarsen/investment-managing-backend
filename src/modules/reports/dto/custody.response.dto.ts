import { DivideBy100 } from "../../../decorators/divide-by-100";

export class CustodyResponseDTO {
    id: number

    quantity: 27
    
    @DivideBy100()
    averagePrice: number

    @DivideBy100()
    buyPrice: number

    buyQuantity: number

    createdAt: string
}