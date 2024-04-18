import { FastifyInstance, FastifyReply } from 'fastify';

import jobsRoute from '@flow/modules/api/jobs/jobs.route';
import messagesRoute from '@flow/modules/api/messages/messages.route';
import queuesRoute from '@flow/modules/api/queues/queues.route';

async function routes(route: FastifyInstance) {
    route.get('/healthcheck', (_, reply: FastifyReply) => {
        return reply.status(200).send('API is at your service! (Up)');
    });

    route.register(jobsRoute, {
        prefix: '/jobs',
    });

    route.register(messagesRoute, {
        prefix: '/messages',
    });

    route.register(queuesRoute, {
        prefix: '/queues',
    });
}

export default routes;
