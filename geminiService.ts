import { GoogleGenAI, GenerateContentStreamResult } from "@google/genai";
import { Tone, Length } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateExpandedTextStream = async (
  input: string,
  tone: Tone,
  length: Length
): Promise<GenerateContentStreamResult> => {
  
  const systemInstruction = `
あなたはプロフェッショナルなライティングアシスタントです。
ユーザーは「単語の羅列」や「箇条書き」、「断片的なメモ」を入力します。
あなたの仕事は、それらの情報を元に、指定された【トーン】と【長さ】で、自然で読みやすい、しっかりとした文章（日本語）を作成することです。

## ルール
1. 入力された情報の文脈を補完し、論理的なつながりを持たせてください。
2. 入力に含まれていない事実を勝手に捏造しないでください（文脈を整えるための一般的な挨拶や接続詞はOK）。
3. 指定されたトーンと言葉遣いを厳守してください。
4. 出力はMarkdown形式ではなく、プレーンテキストで見やすく整形してください（適度な改行はOK）。

## 設定
- トーン: ${tone}
- 長さ: ${length}
`;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: input }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // 創造性と安定性のバランス
      }
    });

    return responseStream;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};