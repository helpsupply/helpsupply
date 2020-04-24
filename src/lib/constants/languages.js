const availableLanguages = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'Chinese: Mandarin', value: 'mandarin' },
  { label: 'Chinese: Cantonese', value: 'cantonese' },
  { label: 'Russian', value: 'russian' },
  { label: 'Haitian Creole', value: 'haitian-creole' },
  { label: 'Bengali', value: 'bengali' },
  { label: 'Yiddish', value: 'yiddish' },
  { label: 'French', value: 'french' },
  { label: 'Italian', value: 'italian' },
  { label: 'Korean', value: 'korean' },
  { label: 'Arabic', value: 'arabic' },
  { label: 'Polish', value: 'polish' },
  { label: 'Tagalog', value: 'tagalog' },
  { label: 'ASL', value: 'asl' },
];

export const LANGUAGES = availableLanguages.sort((a, b) => {
  if (a.label.toLowerCase() < b.label.toLowerCase()) {
    return -1;
  }
  if (a.label.toLowerCase() > b.label.toLowerCase()) {
    return 1;
  }
  return 0;
});
