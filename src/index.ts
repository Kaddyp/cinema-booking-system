import { app } from './app';
import 'dotenv/config';
// Port Number Setup 
const PORT = process.env.APP_PORT || 8080;
const start = async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
};
  
start();