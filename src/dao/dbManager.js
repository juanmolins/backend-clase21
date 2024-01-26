import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://rulomolins:jOQIS5NG1d1Cei13@cluster0.8dfub8y.mongodb.net';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'e-commerce',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión a la base de datos establecida');

    
  } catch (error) {
    console.error('Error de conexión a la base de datos o al iniciar el servidor:', error);
  }
};

export default connectDB;
