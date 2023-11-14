import { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { prisma } from '../lib/prisma'

import { salesorderRoutes } from './salesorder'

import { Full_Price } from '../util/calculate'

export async function clientsRoutes(app: FastifyInstance) {

///////   clients base GET

  app.get('/clients', async () => {
    const clients = await prisma.client.findMany()
    return clients
  })

///////   clients base ID GET

  app.get('/clients/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = paramSchema.parse(request.params)
    const client = await prisma.client.findFirstOrThrow({
      where: {
        id
      }
    })
    return client
  })

/////////// BASE CPF N)6) NÃO CONSEGUI


///////POST INSOMNIA

  app.post('/clients', async request => {
    const bodySchema = z.object({
      name_cliente: z.string(),
      telephone: z.string(),
      email: z.string(),
      cpf: z.string(),
    })

    const { name_cliente, telephone, email, cpf } = bodySchema.parse(request.body)

    const client = await prisma.client.create({
      data: {
        name_cliente,
        telephone,
        email,
        cpf
      }
    })
    return client
  })

///////DELETE INSOMNIA

  app.delete('/clients/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    await prisma.client.delete({
      where: {
        id
      }
    })
  })


///////PUT INSOMNIA

  app.put('/clients/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    const bodySchema = z.object({
      name_cliente: z.string(),
      telephone: z.string(),
      email: z.string(),
      cpf: z.string()
    })

    const { name_cliente, telephone, email, cpf } = bodySchema.parse(request.body)

    const client = await prisma.client.update({
      where: {
        id
      },
      data: {
        name_cliente,
        telephone,
        email,
        cpf
      }
    })
    return client
  })

  /// SITE CLIENTES SALESORDER

  app.get('/clients/salesorder', async () => {
    const client = await prisma.client.findMany({
      include: {
        SalesOrder: true,
      }
    })
    return client
  })  

/// PRA FAZER AINDA

  app.get('/clients/salesorderunit', async () => {
    const clients = await prisma.client.findMany({
      include: {
        SalesOrder: true,
      }
    })
    return clients.map(client =>{
      return {
        id: client.id,
        name_cliente: client.name_cliente,
        cpf: client.cpf,
        salesOrder: client.SalesOrder.map(salesOrder =>{
          return {
            product_name: salesOrder.product_name,
            sales_order_data: salesOrder.sales_order_data,
            amount: salesOrder.amount,
            unitary_value: salesOrder.unitary_value,
          }
        })
        
      }
    })
  }) 
  app.get('/clients/salesordertotal', async () => {
    const clients = await prisma.client.findMany({
      include: {
        SalesOrder: true,
      }
    })
    return clients.map(client =>{
      return {
        id: client.id,
        name_cliente: client.name_cliente,
        telephone: client.telephone,
        salesOrder: client.SalesOrder.map(salesOrder =>{
          return {
            product_name: salesOrder.product_name,
            sales_order_data: salesOrder.sales_order_data,
            amount: salesOrder.amount,
            unitary_value: salesOrder.unitary_value,
            preço_total: Full_Price(salesOrder.amount,salesOrder.unitary_value),
            preço_total_juros: Full_Price(salesOrder.amount,salesOrder.unitary_value) * 11/10

          }
        })
        
      }
    })
  
 })



}
