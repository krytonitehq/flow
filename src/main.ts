import { APP_CONFIG } from '@flow/config/app.config';
import start from './server';

start(Number(APP_CONFIG.PORT), APP_CONFIG.HOST);
