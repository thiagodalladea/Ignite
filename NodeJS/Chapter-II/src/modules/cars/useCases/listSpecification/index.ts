import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ListSpecificationsUseCase } from '../listSpecification/ListSpecificationsUseCase'
import { ListSpecificationsController } from '../listSpecification/ListSpecificationsController';

const specificationsRepository = SpecificationsRepository.getInstance()
const listSpecificationUseCase = new ListSpecificationsUseCase(specificationsRepository)
const listSpecificationsController = new ListSpecificationsController(listSpecificationUseCase)

export { listSpecificationsController }