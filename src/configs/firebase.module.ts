import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import 'dotenv/config';

@Injectable()
export class FirebaseModule {
  constructor(private readonly configService: ConfigService) {
    const serviceAccount = admin.credential.cert({
      clientEmail: process.env.client_email,
      privateKey: process.env.privateKey,
      projectId: process.env.project_id,
    });

    admin.initializeApp({
      credential: serviceAccount,
      databaseURL: 'https://operand-dev-default-rtdb.firebaseio.com/',
    });
  }
}
