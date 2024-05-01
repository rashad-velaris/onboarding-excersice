import { Router } from 'express';
import taskRoutes from './routes/taskRoutes';
import { ENV } from './config/configs';

/**
 * Contains all API routes for the application.
 */
const router = Router();

router.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.versions.node,
    nodeEnv: process.env.NODE_ENV,
    env: ENV,
    message: 'OK',
    serviceName: 'task-service',
    timestamp: Date.now()
  };

  try {
    res.send(healthCheck);
  } catch (e) {
    healthCheck.message = e;
    res.status(503).send();
  }
});

router.use('/tasks', taskRoutes);

export default router;
