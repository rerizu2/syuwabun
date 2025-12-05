export enum Tone {
  Business = 'ビジネス',
  Casual = 'カジュアル',
  Polite = '丁寧・敬語',
  Academic = 'アカデミック',
  Creative = 'クリエイティブ',
  Email = 'メール作成',
}

export enum Length {
  Concise = '短め (要約)',
  Standard = '普通',
  Detailed = '長め (詳細)',
}

export interface GenerationConfig {
  tone: Tone;
  length: Length;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}