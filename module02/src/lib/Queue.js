import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail]; // each new job will be included here

class Queue {
  constructor() {
    /**
     * We can have many queues.
     * Each kind of service/background job will have its own queue
     * For example, send mail for appointment cancellation will have its own queue
     * Send mail for password recovery will have its own queue.
     *
     * Every works within queues are called JOBS.
     *
     * We will create ./src/app/jobs/CancellationMail.js
     */
    this.queues = {};

    this.init();
  }

  init() {
    // here we are getting our jobs array and storing at this.queues[]
    // in other workerData, we are adding queues
    //
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          // here we store our queue
          redis: redisConfig,
        }),
        handle, // this will process the current job
      };
    });
  }

  add(queue, job) {
    /** it will add new jobs inside each queue
     * For example, for each send e-mail we will
     * store this job into a given queue
     *
     * Only add() WILL NOT PROCESS the jobs
     */
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    /** Here we will process each job of each queue */
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // let's add on('failed') to listen errors
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
