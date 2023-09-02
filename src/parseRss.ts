import * as RssParser from 'rss-parser';
import { format, addHours, subDays } from 'date-fns';
import { CsvFormat } from '../types/CsvFormat';
import { ja } from 'date-fns/locale';
import { RssFormat } from '../types/RssFormat';
import { logError } from '../main';

export const parseRss = async (csvList: CsvFormat[]): Promise<RssFormat[]> => {
  const parser = new RssParser();
  const res: RssFormat[] = [];

  for (const user of csvList) {
    try {
      const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${user.id}`;
      const feed = await parser.parseURL(url);

      const yesterdayUpdatedVideo = feed.items.filter((w) => {
        return (
          format(subDays(new Date(), 1), 'yyyy/MM/dd') ===
          format(new Date(w.pubDate), 'yyyy/MM/dd')
        );
      });

      if (yesterdayUpdatedVideo.length === 0) continue;

      res.push({
        userName: feed.title,
        movie: yesterdayUpdatedVideo.map((m) => ({
          title: m.title!,
          link: m.link!,
          date: format(new Date(m.pubDate!), 'yyyy/MM/dd HH:mm'),
        })),
      });
    } catch (e) {
      logError('parseRSS', e);
      throw e;
    }
  }

  return res;
};
