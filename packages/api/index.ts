import Fastify from "fastify";
import { toNodeHandler } from "better-auth/node";
const fastify = Fastify({ logger: true });

import fastifyCors from "@fastify/cors";
import { auth } from "./lib/auth.ts";
import type { FastifyReply } from "fastify";

type HttpHeaders = Partial<ReturnType<FastifyReply["getHeaders"]>>;
function mapHeaders(fastifyHeaders: HttpHeaders) {
  const headers = new Headers();
  Object.entries(fastifyHeaders).forEach(([key, value]) => {
    if (value) headers.append(key, value.toString());
  });

  return headers;
}

// Configure CORS policies
fastify.register(fastifyCors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

const authHandler = toNodeHandler(auth);

fastify.addContentTypeParser(
  "application/json",
  /* c8 ignore next 3 */
  (_request, _payload, done) => {
    done(null, null);
  },
);

fastify.all("/auth/*", async (request, reply) => {
  reply.raw.setHeaders(mapHeaders(reply.getHeaders()));
  await authHandler(request.raw, reply.raw);
});

fastify.get("/health", async (request, reply) => {
  return "ok";
});

// fastify.post("/auth/sign-in/magic-link", async (request, reply) => {
//   return "ok";
// });

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
