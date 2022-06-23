export interface ICarsController {
    create(data: any): Promise<void>
    getById(id: string): Promise<any> 
    deleteById(id: string): Promise<void>
    updateById(id: string, data: any): Promise<void>
    listAll(): Promise<Array<any>>
}