import { format, subDays } from 'date-fns';
import { DISCORD_WEBHOOK_URL } from '../setting';
import { DiscordWebhook } from '../types/DiscordWebhook';
import { RssFormat } from '../types/RssFormat';

export const sendDiscord = async (parsedRss: RssFormat[]) => {
  let content: string[] = [];
  const requestContents: string[] = [];

  for (const user of parsedRss) {
    content.push('## :red_circle: ' + user.userName);
    for (const movie of user.movie) {
      content.push(movie.title + '\r' + movie.link + '\r');
    }
    if (content.join('\r').length >= 1500) {
      requestContents.push(content.join('\r'));
      content = [];
    }
  }

  if (requestContents.length === 0) {
    requestContents.push(content.join('\r'));
  }

  let i = 0;
  for (const requestContent of requestContents) {
    const req: DiscordWebhook = {
      username: format(subDays(new Date(), 1), 'M月d日') + 'の更新 #' + ++i,
      content: requestContent,
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: { 'Content-Type': 'application/json' },
    }).catch((e) => {
      console.error('チャット送信', e);
    });
  }
};
