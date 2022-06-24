import { CarsRequest, CarsResponse } from "./cars.dto"

export interface ICarsController {
    create(data: CarsRequest, res: Response): Promise<CarsResponse>
    getById(id: string, res: Response): Promise<CarsResponse> 
    deleteById(id: string, res: Response): Promise<void>
    updateById(id: string, data: any, res: Response): Promise<void>
    listAll(res: Response): Promise<CarsResponse[]>
}