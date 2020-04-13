import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Customer, Employee} from '../models';
import {CustomerRepository, RoleRepository} from '../repositories';

export class CustomerEmployeeController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
    @repository(RoleRepository) protected roleRepository:
      RoleRepository
  ) {}

  @get('/customers/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Customer has many Employee',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Employee)
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employee>,
  ): Promise<unknown> {


    //return this.customerRepository.employees(id).find(filter);
    const data = await this.customerRepository.employees(id).find(filter);
    const customer = await this.customerRepository.find();
    const role = await this.roleRepository.find();
    const obj = data.map((d) => {
      return {
        id: d.id,
        firstName: d.firstName,
        middleName: d.middleName,
        lastName: d.lastName,
        email: d.email,
        phone: d.phone,
        address: d.address,
        role: role.filter(r => r.id === d.roleId)[0].name,
        customer: customer.filter(c => c.id === d.customerId)[0].name
      }
    })
    return obj;
  }

  @post('/customers/{id}/employees', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployeeInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.customerRepository.employees(id).create(employee);
  }

  @patch('/customers/{id}/employees', {
    responses: {
      '200': {
        description: 'Customer.Employee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Partial<Employee>,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.customerRepository.employees(id).patch(employee, where);
  }

  @del('/customers/{id}/employees', {
    responses: {
      '200': {
        description: 'Customer.Employee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.customerRepository.employees(id).delete(where);
  }
}
