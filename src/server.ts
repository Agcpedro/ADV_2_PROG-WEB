import fastify from "fastify";

import { clientsRoutes }
  from "./routes/clients";

import { salesorderRoutes }
  from "./routes/salesorder";

const app = fastify();

app.register(clientsRoutes,salesorderRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running on port 3333')
})
