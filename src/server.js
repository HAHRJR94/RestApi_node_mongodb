import express, { json} from 'express';
import indexRoutes from './routes/index.routes';
import taskRoutes from './routes/tasks.routes';

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middlewares
app.use(json());

//Routes
app.use(indexRoutes);
app.use('/tasks',taskRoutes);

export default app;