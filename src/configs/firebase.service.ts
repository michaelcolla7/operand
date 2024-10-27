import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private readonly firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {
    const serviceAccount = JSON.parse(
      this.configService.get<string>('FIREBASE_CREDENTIALS'),
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });

    this.firestore = admin.firestore();
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }
}
