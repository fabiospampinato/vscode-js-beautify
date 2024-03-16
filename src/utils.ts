
/* IMPORT */

import js_beautify from 'js-beautify';
import vscode from 'vscode';

/* MAIN */

const getFormattingOptionsCSS = (): js_beautify.CSSBeautifyOptions => {

  return getFormattingOptionsHTML ();

};

const getFormattingOptionsHTML = (): js_beautify.HTMLBeautifyOptions => {

  const conf = vscode.workspace.getConfiguration ();

  return {
    eol: conf.get ( 'files.eol' ),
    indent_size: conf.get ( 'editor.tabSize' ),
    indent_with_tabs: !conf.get ( 'editor.insertSpaces' ),
    end_with_newline: conf.get ( 'html.format.endWithNewline' ),
    wrap_line_length: conf.get ( 'html.format.wrapLineLength' ),
    wrap_attributes: conf.get ( 'html.format.wrapAttributes' ),
    unformatted: conf.get ( 'html.format.unformatted' ),
    indent_inner_html: conf.get ( 'html.format.indentInnerHtml' ),
    preserve_newlines: conf.get ( 'html.format.preserveNewlines' ),
    max_preserve_newlines: conf.get ( 'html.format.maxPreserveNewlines' ),
    indent_handlebars: conf.get ( 'html.format.indentHandlebars' ),
    extra_liners: conf.get ( 'html.format.extraLiners' )
  };

};

const getFormattingOptionsJS = (): js_beautify.JSBeautifyOptions => {

  const conf = vscode.workspace.getConfiguration ();

  return {
    ...getFormattingOptionsHTML (),
    end_with_newline: conf.get ( 'files.insertFinalNewline' ),
    space_after_anon_function: conf.get ( 'javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions' ),
    brace_style: conf.get ( 'javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis' )
  };

};

/* EXPORT */

export {getFormattingOptionsCSS, getFormattingOptionsHTML, getFormattingOptionsJS};
