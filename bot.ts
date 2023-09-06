import * as fs from 'fs-extra';
import { format } from 'date-fns';
import * as cron from 'node-cron';
import { main, logError } from './main';

const BaseLogic = async () => {
  console.log(`Start Running...`);
  cron.schedule('0 1 * * *', function () {
    main();
  });
};

const TryConnect = async () => {
  try {
    await BaseLogic();
  } catch (e) {
    console.error('TryConnect:', format(new Date(), 'yyyy-MM-dd HH:mm:ss'), e);
    setTimeout(() => {
      TryConnect();
    }, 1000 * 60);
  }
};
TryConnect();
