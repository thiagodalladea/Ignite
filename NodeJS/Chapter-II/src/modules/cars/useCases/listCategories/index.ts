import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

const categoriesRepositry = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositry)
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

export { listCategoriesController }