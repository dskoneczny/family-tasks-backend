
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Add Task (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const createTaskMutation = `mutation($title: String!, $description: String) {
    addTask(newTaskData: { title: $title, description: $description }) {
      id
      title
    }
  }`;

  it('addTask mutation', () => {
  const TASK_TITLE = "Go for a walk with dog"
    return (
      request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {title: TASK_TITLE},
          query: createTaskMutation
        })
        .expect(({ body }) => {
          const data = body.data.addTask;
          expect(data.title).toBe(TASK_TITLE);
          expect(data.id).not.toBeNull();
        })
        .expect(200)
    );
  });
});