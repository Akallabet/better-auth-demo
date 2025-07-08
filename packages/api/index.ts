import Fastify from "fastify";

const fastify = Fastify({ logger: true });

import fastifyCors from "@fastify/cors";

// Configure CORS policies
fastify.register(fastifyCors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

fastify.get("/health", async (request, reply) => {
  return "ok";
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
