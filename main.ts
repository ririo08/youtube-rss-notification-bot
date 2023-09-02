import { format } from 'date-fns';
import { importCsv } from './src/importCsv';
import { parseRss } from './src/parseRss';
import { sendDiscord } from './src/sendDiscord';

export const main = async () => {
  try {
    console.log('run: ' + format(new Date(), 'yyyy/MM/dd'));

    const csvList = await importCsv();
    console.log(
      format(new Date(), 'HH:mm:ss'),
      'CSV取得完了:',
      csvList.length + '件'
    );

    const parsedRss = await parseRss(csvList);
    console.log(
      format(new Date(), 'HH:mm:ss'),
      'RSS取得完了:',
      parsedRss.length + '件'
    );

    await sendDiscord(parsedRss);
    console.log(format(new Date(), 'HH:mm:ss'), 'Discord送信完了');
  } catch (e) {
    logError('main', e);
    await main();
  }
};

export const logError = (errorMessage: string, e: any = null) => {
  console.error(
    errorMessage + ': ',
    format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    e
  );
};

main();
