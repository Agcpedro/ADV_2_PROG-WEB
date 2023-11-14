import { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { prisma } from '../lib/prisma'

import dayjs, { Dayjs } from 'dayjs'

export async function salesorderRoutes(app: FastifyInstance) {


//// SALESORDER BASE GET

  app.get('/salesorder', async () => {
    const salesorder = await prisma.salesOrder.findMany()
    return salesorder
  })


//// SALESORDER ID GET

  app.get('/salesorder/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = paramSchema.parse(request.params)
    const salesOrder = await prisma.salesOrder.findFirstOrThrow({
      where: {
        id
      }
    })
    return salesOrder
  })

  
 //// POST SALESORDER INSOMNIA

  app.post('/salesorder', async request => {
    const bodySchema = z.object({
      product_name: z.string(),
      sales_order_data: z.coerce.date(),
      amount: z.string(),
      unitary_value: z.string(),
      clientId: z.string(),
    })

    const { product_name, sales_order_data, amount, unitary_value, clientId } = bodySchema.parse(request.body)

    const salesOrder = await prisma.salesOrder.create({
      data: {
        product_name,
        sales_order_data: dayjs(sales_order_data).toDate(),
        amount,
        unitary_value,
        clientId
      }
    })
    return salesOrder
  })

//// DELETE SALESORDER INSOMNIA


  app.delete('/salesorder/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    await prisma.salesOrder.delete({
      where: {
        id
      }
    })
  })


  //// PUT SALESORDER INSOMNIA

  app.put('/salesorder/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(request.params)

    const bodySchema = z.object({
      product_name: z.string(),
      sales_order_data: z.string(),
      amount: z.string(),
      unitary_value: z.string(),
      clientId: z.string(),
    })

    const { product_name, sales_order_data, amount, unitary_value, clientId } = bodySchema.parse(request.body)

    const salesOrder = await prisma.salesOrder.update({
      where: {
        id
      },
      data: {
        product_name,
        sales_order_data,
        amount,
        unitary_value,
        clientId
      }
    })
    return salesOrder
  })
}