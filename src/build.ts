import Fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { loggerConfig } from '@flow/utils/logger';
import { randId } from '@flow/utils/randId';

import routes from '@flow/modules/api/routes';

const buildServer = () => {
    const app: FastifyInstance = Fastify({
        trustProxy: true,
        logger: loggerConfig,
        genReqId() {
            return randId('req', 16);
        },
    });

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.setNotFoundHandler(function (request, reply) {
        return reply.code(404).send({
            error: {
                message: `Unrecognized request URL (${request.method}: ${request.url}).`,
                type: 'invalid_request_error',
            },
        });
    });

    app.setErrorHandler(function (error: any, _, reply) {
        if (error.statusCode === 400) {
            error.type = 'invalid_request_error';
        }

        return reply.status(error.statusCode as number).send({
            error: {
                message: error.message,
                type: error.type || 'api_error',
            },
        });
    });

    app.addHook('onSend', async (request: any, reply, payload) => {
        reply.header('X-Request-ID', request.id);

        return payload;
    });

    app.register(routes);

    return app;
};

export default buildServer;
