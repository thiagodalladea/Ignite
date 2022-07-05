import { v4 as uuidV4 } from 'uuid'

class Category {
    name: string;
    description: string;
    id?: string;
    createdAt: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

export { Category }