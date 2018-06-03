import CodeMirrorSpellChecker from 'codemirror-spell-checker-inkdrop'

import LanguageChooser from './spell-checker-display'

module.exports = {

  activate () {
    const { CodeMirror } = require('inkdrop')
    let language = inkdrop.config.get('plugins.spell-checker.language')
    if (!language) {
      language = 'en_US'
    }

    // Store the latest languages
    inkdrop.config.set('plugins.spell-checker.languages', CodeMirrorSpellChecker.languages)

    CodeMirrorSpellChecker({
      codeMirrorInstance: CodeMirror,
      ignoreCodeBlocks: true,
      language: language
    })
    global.inkdrop.on('editor:init', ::this.handleEditorInit)

    inkdrop.components.registerClass(LanguageChooser)
    inkdrop.layouts.addComponentToLayout('modals', 'LanguageChooser')
  },

  deactivate () {
    inkdrop.layouts.removeComponentFromLayout('modals', 'LanguageChooser')
    inkdrop.components.deleteClass(LanguageChooser)

    const editor = global.inkdrop.getActiveEditor()
    if (editor && editor.codeMirror && this.originalMode) {
      editor.codeMirror.setOption('mode', this.originalMode)
    }
  },

  handleEditorInit (editor) {
    const cm = editor.codeMirror
    this.originalMode = cm.getOption('mode')
    cm.setOption('backdrop', this.originalMode)
    cm.setOption('mode', 'spell-checker')
  }
}
