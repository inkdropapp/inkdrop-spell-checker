import CodeMirrorSpellChecker from 'codemirror-spell-checker-inkdrop'
import CodeMirror from 'codemirror'

module.exports = {
  activate() {
    CodeMirrorSpellChecker({
      codeMirrorInstance: CodeMirror,
      ignoreCodeBlocks: true
    })
    global.inkdrop.onEditorLoad(this.handleEditorInit.bind(this))
  },

  deactivate() {
    const editor = global.inkdrop.getActiveEditor()
    if (editor && editor.codeMirror && this.originalMode) {
      editor.codeMirror.setOption('mode', this.originalMode)
    }
  },

  handleEditorInit(editor) {
    const { cm } = editor
    this.originalMode = cm.getOption('mode')
    cm.setOption('backdrop', this.originalMode)
    cm.setOption('mode', 'spell-checker')
  }
}
