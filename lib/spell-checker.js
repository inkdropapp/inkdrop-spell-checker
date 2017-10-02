'use babel';

import CodeMirrorSpellChecker from 'codemirror-spell-checker-inkdrop'

module.exports = {

  activate () {
    const { CodeMirror } = require('inkdrop')
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
    this.originalMode = cm.getOption('mode')
    cm.setOption('backdrop', this.originalMode)
    cm.setOption('mode', 'spell-checker')
  }
};
