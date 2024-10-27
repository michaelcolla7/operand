import * as Joi from 'joi';

export const configuration = () => ({
  firebase: {
    serviceAccount: Joi.object({
      type: Joi.string().required(),
      project_id: Joi.string().required(),
      private_key_id: Joi.string().required(),
      private_key: Joi.string().required(),
      client_email: Joi.string().required(),
      client_id: Joi.string().required(),
      auth_uri: Joi.string().required(),
      token_uri: Joi.string().required(),
      auth_provider_x509_cert_url: Joi.string().required(),
      client_x509_cert_url: Joi.string().required(),
    }).required(),
  },
});

export const validationSchema = Joi.object({
  // ... outras validações de variáveis de ambiente
  FIREBASE_SERVICE_ACCOUNT: Joi.string().required(),
});
