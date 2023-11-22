import InsertService from "../services/InsertService";
import { IDiffAllList } from "../types/client";


class InsertController {
    constructor(private createData: InsertService) {}

    async handler(file: IDiffAllList) {
        this.createData.execute(file)
    }
}

export default InsertController