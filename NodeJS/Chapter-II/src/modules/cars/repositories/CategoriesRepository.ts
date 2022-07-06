import { Category } from '../model/Category'
import { ICategoriesRepository, ICreateCategory } from './ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[]

    constructor() {
        this.categories = []
    }

    create({ name, description }: ICreateCategory) {
        const category = new Category()

        Object.assign(category, {
            name,
            description,
            createdAt: new Date()
        })

        this.categories.push(category)
    }

    list(): Category[] {
        return this.categories
    }

    findByName(name: string): Category {
        const category = this.categories.find((category) => category.name === name)
        return category
    }
}

export { CategoriesRepository }