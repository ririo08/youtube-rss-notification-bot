export interface DiscordWebhook {
  username?: string;
  avatar_url?: string;
  content?: string;
  embeds?: Embed[];
}

interface EmbedField {
  name?: string;
  value?: string;
  inline?: boolean;
}

interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
}

interface EmbedFooter {
  text?: string;
  icon_url?: string;
}

interface EmbedImage {
  url?: string;
}

interface EmbedThumbnail {
  url?: string;
}

interface Embed {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

const sample: DiscordWebhook = {
  username: 'Qiitaさん',
  avatar_url: 'https://github.com/qiita.png',
  content: 'オススメの記事です！',
  embeds: [
    {
      title: 'Markdown記法 チートシート',
      description:
        'Markdown記法のチートシートです。本ページではQiitaで使用可能なMarkdownのみ掲載しているため、一部原文と異なります。Markdownの原文については、Daring Fireball: Markdown Syntax Documentationをご覧下さい。...',
      url: 'https://qiita.com/Qiita/items/c686397e4a0f4f11683d',
      timestamp: '2018-04-09T00:00:00+09:00',
      color: 5620992,
      footer: {
        text: '© 2011-2018 Increments Inc.',
        icon_url: 'https://github.com/increments.png',
      },
      image: {
        url: 'http://lorempixel.com/400/200/cats/',
      },
      thumbnail: {
        url: 'https://github.com/qiita.png',
      },
      author: {
        name: '@Qiita',
        url: 'https://qiita.com/Qiita',
        icon_url:
          'https://qiita-image-store.s3.amazonaws.com/0/88/profile-images/1512392618',
      },
      fields: [
        {
          name: ':thumbsup:いいね',
          value: '6353',
          inline: true,
        },
        {
          name: ':file_folder:ストック',
          value: '999',
          inline: true,
        },
        {
          name: ':bookmark_tabs:タグ',
          value: 'Qiita, Markdown',
        },
      ],
    },
  ],
};
