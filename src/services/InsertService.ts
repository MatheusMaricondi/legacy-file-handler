import IDataRepository from "../repositories/IDataRepository";
import { IDiffAllList } from "../types/client";


class InsertService {
    constructor(private insertRepository: IDataRepository) {}

    async execute(data: IDiffAllList) {
        return await this.insertRepository.insertData(data)
    }
}

export default InsertService