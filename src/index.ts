import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import routes from "./routes";

const server = Fastify();

server.register(fastifyEnv, {
  schema: {
    type: "object",
    required: ["DATABASE_URL"],
    properties: {
      DATABASE_URL: {
        type: "string",
      },
    },
  },
  dotenv: true, // Load variables from .env file if available
});

// Register routes
server.register(routes);

server.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
