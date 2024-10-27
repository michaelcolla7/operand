import { Injectable } from '@nestjs/common';
import { Task } from './tasks.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class TaskService {
  async create(task: Task): Promise<Task> {
    const firestore = new admin.firestore.Firestore();
    const docRef = await firestore.collection('tasks').add(task);
    const snapshot = await docRef.get();
    return { id: snapshot.id, ...snapshot.data() } as Task;
  }

  async findAll(): Promise<Task[]> {
    const firestore = new admin.firestore.Firestore();
    const snapshot = await firestore.collection('tasks').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Task);
  }

  async findOne(id: string): Promise<Task> {
    const firestore = new admin.firestore.Firestore();
    const snapshot = await firestore.collection('tasks').doc(id).get();
    if (!snapshot.exists) {
      return null;
    }
    return { id: snapshot.id, ...snapshot.data() } as Task;
  }

  async update(id: string, task: Task): Promise<Task> {
    const firestore = new admin.firestore.Firestore();
    const taskToUpdate = {
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      updatedAt: new Date(),
    };

    await firestore.collection('tasks').doc(id).update(taskToUpdate);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const firestore = new admin.firestore.Firestore();
    await firestore.collection('tasks').doc(id).delete();
  }
}
