import  { Category } from '../model/Category'
import { ICategoriesRepository, ICreateCategory } from './ICategoriesRepository'



class PostgresCateforiesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        throw new Error('Method not implemented')
    }
    list(): Category[] {
        throw new Error('Method not implemented')
    }
    create({ name, description }: ICreateCategory): void {
        throw new Error('Method not implemented')
    }
}

export { PostgresCateforiesRepository }