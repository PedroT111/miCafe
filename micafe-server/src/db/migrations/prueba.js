module.exports = {
    async up(db) {
      // Realiza los cambios necesarios en la base de datos
      await db.collection('users').insertOne({ name: 'John Doe', email: 'johndoe@example.com' });
    },
  
    async down(db) {
      // Revierte los cambios realizados en la migración "up"
      await db.collection('users').deleteOne({ email: 'johndoe@example.com' });
    },
  };
  