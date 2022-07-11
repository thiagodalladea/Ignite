import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { Specification } from '../../model/Specification'

class ListSpecificationsUseCase {
    constructor(private specificationsRepository: SpecificationsRepository){}
    
    execute(): Specification[]{
        const specifications = this.specificationsRepository.list()

        return specifications
    }
}

export { ListSpecificationsUseCase }