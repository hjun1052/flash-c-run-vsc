import * as vscode from 'vscode';

type LangKey = 'en' | 'ko' | 'ja' | 'zh-cn' | 'fr' | 'es';

const translations: Record<LangKey, Record<string, string>> = {
  en: {
    description: "Compile and run your C files instantly with one click.",
    compilertype: "The C compiler to use (e.g., gcc, clang, tcc)",
    compilerflags: "Additional GCC compiler flags",
    outputname: "Specify output filename (leave empty to use source name)",
    adexec: "Automatically delete the executable after running",
    buildfolder: "Save build output to .build folder",
    buildfoldername: "Folder to save build output"
  },
  ko: {
    description: "한 번의 클릭으로 C 파일을 빌드하고 실행하세요.",
    compilertype: "컴파일에 사용할 C 컴파일러 (예: gcc, clang, tcc)",
    compilerflags: "추가 GCC 컴파일 플래그",
    outputname: "실행파일 이름 지정 (비워두면 원본 파일명 사용)",
    adexec: "실행 후 생성된 실행 파일 자동 삭제",
    buildfolder: "빌드 결과물을 .build 폴더에 저장",
    buildfoldername: "빌드 결과물을 저장할 폴더"
  },
  ja: {
    description: "1クリックでCファイルをビルドして実行します。",
    compilertype: "使用するCコンパイラ（例: gcc、clang、tcc）",
    compilerflags: "追加のGCCコンパイルフラグ",
    outputname: "出力ファイル名を指定（空白でソース名を使用）",
    adexec: "実行後に生成された実行ファイルを自動削除",
    buildfolder: "ビルド成果物を.buildフォルダに保存",
    buildfoldername: "ビルド成果物を保存するフォルダ"
  },
  'zh-cn': {
    description: "一键即时构建并运行你的 C 文件。",
    compilertype: "要使用的C编译器（如：gcc、clang、tcc）",
    compilerflags: "额外的 GCC 编译参数",
    outputname: "指定输出文件名（留空使用源文件名）",
    adexec: "运行后自动删除生成的可执行文件",
    buildfolder: "将构建结果保存在 .build 文件夹中",
    buildfoldername: "保存构建输出的文件夹"
  },
  fr: {
    description: "Construisez et exécutez vos fichiers C instantanément d'un clic.",
    compilertype: "Le compilateur C à utiliser (ex : gcc, clang, tcc)",
    compilerflags: "Options de compilation GCC supplémentaires",
    outputname: "Nom du fichier de sortie (laisser vide pour utiliser le nom source)",
    adexec: "Supprimer automatiquement l'exécutable après exécution",
    buildfolder: "Enregistrer les résultats de build dans le dossier .build",
    buildfoldername: "Dossier pour enregistrer les résultats de compilation"
  },
  es: {
    description: "Compile y ejecute sus archivos C instantáneamente con un solo clic.",
    compilertype: "El compilador C a usar (p. ej.: gcc, clang, tcc)",
    compilerflags: "Banderas adicionales para el compilador GCC",
    outputname: "Nombre del ejecutable (vacío para usar el del archivo fuente)",
    adexec: "Borrar el ejecutable automáticamente después de ejecutarlo",
    buildfolder: "Guardar archivos compilados en la carpeta .build",
    buildfoldername: "Carpeta para guardar los resultados de la compilación"
  }
};

function detectLanguage(): LangKey {
  const vscodeLang = vscode.env.language;
  if (vscodeLang.startsWith('ko')) return 'ko';
  if (vscodeLang.startsWith('ja')) return 'ja';
  if (vscodeLang.startsWith('zh')) return 'zh-cn';
  if (vscodeLang.startsWith('fr')) return 'fr';
  if (vscodeLang.startsWith('es')) return 'es';
  return 'en';
}

const currentLang = detectLanguage();

export function t(key: keyof typeof translations['en'], vars: Record<string, string> = {}): string {
  let msg = translations[currentLang][key] || translations['en'][key] || key;
  for (const [k, v] of Object.entries(vars)) {
    msg = msg.replace(`{${k}}`, v);
  }
  return msg;
}