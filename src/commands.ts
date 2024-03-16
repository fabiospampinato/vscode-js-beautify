
/* IMPORT */

import beautify from 'js-beautify';
import vscode from 'vscode';
import {alert} from 'vscode-extras';
import {getFormattingOptionsCSS, getFormattingOptionsHTML, getFormattingOptionsJS} from './utils';

/* MAIN */

//TODO: Supports reading the closest ".jsbeautifyrc" file

const file = (): void => {

  const {activeTextEditor} = vscode.window;

  if ( !activeTextEditor ) return alert.error ( 'No target file found' );

  const {document} = activeTextEditor;
  const {languageId} = document;

  const isHTML = languageId === 'html' || languageId === 'xml' || languageId === 'svg';
  const isCSS = languageId === 'css' || languageId === 'scss' || languageId === 'less';
  const isJS = languageId === 'javascript' || languageId === 'javascriptreact' || languageId === 'typescript' || languageId === 'typescriptreact';

  const language = isHTML ? 'html' : isCSS ? 'css' : 'js';
  const options = isHTML ? getFormattingOptionsHTML () : isCSS ? getFormattingOptionsCSS () : getFormattingOptionsJS ();

  const source = document.getText ();
  const dist = beautify[language] ( source, options );

  if ( source === dist ) return;

  const edit = new vscode.WorkspaceEdit ();

  edit.replace ( document.uri, new vscode.Range ( 0, 0, document.lineCount, 0 ), dist );

  vscode.workspace.applyEdit ( edit );

};

/* EXPORT */

export {file};
