export default function escapeMarkdown(text) {
  return text.replace(/[_[\]()~`>#\+\-=|{}.!]/g, '\\$&');
}
