import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Customer, Employee} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeCustomerController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) {}

  @get('/employees/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Employee.prototype.id,
  ): Promise<Customer> {
    return this.employeeRepository.customer(id);
  }

}
