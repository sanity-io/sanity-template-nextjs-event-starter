import { NextApiRequest, NextApiResponse } from 'next';
import Ajv from 'ajv';
import { isEmail } from 'validator';

const ajv = new Ajv();
const validate = ajv.compile({
  type: 'object',
  properties: {
    email: {
      type: 'string',
      maxLength: 1024
    }
  },
  required: ['email']
});

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to GET'
      }
    });
  }

  if (!validate(req.query)) {
    const { errors } = validate;
    return res.status(400).json({
      error: {
        code: 'bad_input',
        message: `${errors[0].dataPath}: ${errors[0].message}`
      }
    });
  }

  const user = await getUser(email);
  if (!user) {
    return res.status(404).json({
      error: {
        code: 'not_registered',
        message: 'The email is not registered'
      }
    });
  }

  return res.json(user);
}
