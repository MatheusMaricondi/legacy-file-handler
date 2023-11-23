import InsertService from "../services/InsertService";
import { IDiffAllList } from "../types/client";


class InsertController {
    constructor(private createData: InsertService) {}

    async handler(data: IDiffAllList) {
        this.createData.execute(data)
    }
}

export default InsertController