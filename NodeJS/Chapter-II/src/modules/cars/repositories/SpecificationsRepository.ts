import { Specification } from '../model/Specification'
import { ICreateSpecification, ISpecificationsRepository } from "./ISpecificationRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[]
    constructor() {
        this.specifications = []
    }

    create({ description, name }: ICreateSpecification): void {
        const specification = new Specification()

        Object.assign(specification, {
            name,
            description,
            createdAt: new Date()
        })

        this.specifications.push(specification)
    }

    list(): Specification[] {
        return this.specifications
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(categoryObj => categoryObj.name === name)
        return specification
    }
}

export { SpecificationsRepository }