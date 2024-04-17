import { FastifyInstance, FastifyReply } from 'fastify';

import jobsRoute from '@flow/modules/jobs/jobs.route';
import messagesRoute from '@flow/modules/messages/messages.route';
import queuesRoute from '@flow/modules/queues/queues.route';

async function routes(route: FastifyInstance) {
    route.get('/healthcheck', (_, reply: FastifyReply) => {
        // TODO: respond with 200
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
