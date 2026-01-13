import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
   PORT: number;
   PRODUCT_MICROSERVICES_HOST: string;
   PRODUCT_MICROSERVICES_PORT: number;
   ORDERS_MICROSERVICES_HOST: string;
   ORDERS_MICROSERVICES_PORT: number;
}

const envSchema  = joi.object({
   PORT: joi.number().required(),
   PRODUCT_MICROSERVICES_HOST: joi.string().required(),
   PRODUCT_MICROSERVICES_PORT: joi.number().required(),
   ORDERS_MICROSERVICES_HOST: joi.string().required(),
   ORDERS_MICROSERVICES_PORT: joi.number().required(),
}).unknown(true);


const { error, value } = envSchema.validate( process.env );

if ( error ) {
   throw new Error(`Config validation error: ${ error.message }`);
}

const envVars: EnvVars = value;

export const envs = {
   PORT: envVars.PORT,
   PRODUCT_MICROSERVICES_HOST: envVars.PRODUCT_MICROSERVICES_HOST,
   PRODUCT_MICROSERVICES_PORT: envVars.PRODUCT_MICROSERVICES_PORT,
   ORDERS_MICROSERVICES_HOST:  envVars.ORDERS_MICROSERVICES_HOST,
   ORDERS_MICROSERVICES_PORT:  envVars.ORDERS_MICROSERVICES_PORT,
}