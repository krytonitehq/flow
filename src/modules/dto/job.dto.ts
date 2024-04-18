import { z } from 'zod';

const JOB_DTO_BODY = {};

const JOB_DTO_QUERY = {};

const JOB_DTO_PARAM = {
    id: z.string().min(8).max(16),
};

export { JOB_DTO_BODY, JOB_DTO_QUERY, JOB_DTO_PARAM };
