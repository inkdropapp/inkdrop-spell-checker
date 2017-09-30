'use babel';

import CodeMirrorSpellChecker from 'codemirror-spell-checker'

module.exports = {

  activate () {
    const { CodeMirror } = require('inkdrop')
    console.log('SPELL CHECKER:', CodeMirror)
    CodeMirrorSpellChecker({
      codeMirrorInstance: CodeMirror,
      ignoreCodeBlocks: true
    })
    global.inkdrop.on('editor:init', ::this.handleEditorInit)
  },

  deactivate () {
    const editor = global.inkdrop.getActiveEditor()
    if (editor.codeMirror && this.originalMode) {
      editor.codeMirror.setOption('mode', this.originalMode)
    }
  },

  handleEditorInit (editor) {
    const cm = editor.codeMirror
    console.log('handleEditorInit:', cm)
    // const cm = global.inkdrop.getActiveEditor().codeMirror
    this.originalMode = cm.getOption('mode')
    cm.setOption('backdrop', this.originalMode)
    cm.setOption('mode', 'spell-checker')
  }
};
