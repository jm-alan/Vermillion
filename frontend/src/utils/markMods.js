import textMod from './textMod';

export const bold = updater => textMod(updater, '**');
export const italic = updater => textMod(updater, '*');
export const code = updater => textMod(updater, '`');
export const codeblock = updater => textMod(updater, '```\n', '\n```');
export const link = updater => textMod(updater, '[display text](', ')', 'https://www.example.com/');
export const image = updater => textMod(updater, '![display text](', ')', 'https://www.example.com/image.jpg');
