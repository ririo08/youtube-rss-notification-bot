import * as CsvParser from 'papaparse';
import { CHANNEL_URL_CSV } from '../setting';
import { CsvFormat } from '../types/CsvFormat';

export const importCsv = async (): Promise<CsvFormat[]> => {
  // CSV取得
  const res = await fetch(CHANNEL_URL_CSV)
    .then((res) => {
      return res.text();
    })
    .catch((e) => {
      console.log(e);
    });
  if (typeof res !== 'string') return;

  const parsedCsv = CsvParser.parse<CsvFormat>(res, {
    header: true,
  }).data;

  return parsedCsv;
};

importCsv();
