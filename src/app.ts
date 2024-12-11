import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import movieRoutes from './routes/movieRoutes';
import ticketRoutes from './routes/ticketRoutes';
import paymentRoutes from './routes/paymentRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100 // limit each IP to 100 requests per windowMs   
}));
// Serve static files from the React build directory
//app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(express.static(path.join(__dirname, 'build')));
// Handle root route to serve React's index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});
// only requests to /api/* will be sent to our "router"
app.use('/api/movies', movieRoutes);
app.use('/api/ticketing', ticketRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);
// app.get('/', (req, res)=>{
//     res.send('Movie API is running...');
// })
export { app };












































































// Serve static files from the frontend build folder
// const clientBuildPath = path.join(__dirname, '../client/build');
// app.use(express.static(clientBuildPath));
// Serve index.html for the root route
// app.get('/', (req, res) => {
//     res.sendFile('index.html', { root: clientBuildPath });
// });

// Catch-all route to handle SPA routing
// app.get('*', (req, res) => {
//     res.sendFile('index.html', { root: clientBuildPath });
// });