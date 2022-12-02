import { logger } from 'inkdrop'
import SpellChecker from '@inkdropapp/codemirror-spell-checker'
import CodeMirror from 'codemirror'

SpellChecker(CodeMirror)

class SpellCheckerPlugin {
  config = {
    language: {
      type: 'string',
      default: 'en_US',
      enum: ['de_DE', 'en_AU', 'en_CA', 'en_GB', 'en_US', 'fr_FR', 'ru_RU', 'es_ES', 'uk_UA', 'nl_NL']
    }
  }

  activate() {
    global.inkdrop.onEditorLoad(this.handleEditorInit.bind(this))
  }

  deactivate() {
    if (this.subs) this.subs.dispose()
    const editor = global.inkdrop.getActiveEditor()
    if (editor && editor.codeMirror && this.originalMode) {
      editor.codeMirror.setOption('mode', this.originalMode)
    }
  }

  handleEditorInit(editor) {
    const { cm } = editor
    const lang = inkdrop.config.get('spell-checker.language', 'en_US')
    this.originalMode = cm.getOption('mode')
    cm.setOption('spellCheckLang', lang)
    cm.setOption('backdrop', this.originalMode)
    cm.setOption('mode', 'spell-checker')
    cm.refresh()

    this.subs = inkdrop.config.observe('spell-checker.language', lang => {
      logger.debug('Spellchecker language changed:', lang)
      cm.setOption('spellCheckLang', lang)
    })
  }
}

module.exports = new SpellCheckerPlugin()
