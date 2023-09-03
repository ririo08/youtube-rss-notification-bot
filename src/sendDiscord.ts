import { format, subDays } from 'date-fns';
import { DISCORD_WEBHOOK_URL } from '../setting';
import { DiscordWebhook } from '../types/DiscordWebhook';
import { RssFormat } from '../types/RssFormat';

export const sendDiscord = async (parsedRss: RssFormat[]) => {
  const content: string[] = [];
  for (const user of parsedRss) {
    content.push('## :red_circle: ' + user.userName);
    for (const movie of user.movie) {
      content.push(movie.title + '\r' + movie.link + '\r');
    }
  }

  const req: DiscordWebhook = {
    username: '動画フィード',
    content: content.join('\r'),
    embeds: [
      {
        title: format(subDays(new Date(), 1), 'M月d日') + 'の更新',
      },
    ],
  };

  await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(req),
    headers: { 'Content-Type': 'application/json' },
  }).catch((e) => {
    console.error('チャット送信', e);
  });
};
