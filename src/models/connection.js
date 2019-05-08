import mongoose from 'mongoose';
const dbName = 'db_gamebook';
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://mongo:27017/${dbName}`,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', err => {
  // eslint-disable-next-line no-console
  console.error(err);
  // eslint-disable-next-line no-console
  console.error(`✘ CANNOT CONNECT TO mongoDB DATABASE ${dbName}!`.red);
});

export default function listenToConnectionOpen(onceReady) {
  if (typeof onceReady === 'function') {
    db.on('open', onceReady);
  }
}
