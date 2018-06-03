'use babel'

import { React, CompositeDisposable } from 'inkdrop'

export default class LanguageChooser extends React.Component {
  constructor (props) {
    super(props)

    let languages = inkdrop.config.get('plugins.spell-checker.languages')
    if (!languages) {
      languages = ['en_US']
    }
    let language = inkdrop.config.get('plugins.spell-checker.language')
    if (!language) {
      language = 'en_US'
    }
    this.state = {
      languages,
      language
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(inkdrop.commands.add(document.body, {
      'spell-checker:choose': () => this.choose()
    }))
  }

  componentWillUnmount () {
    this.subscriptions.dispose()
  }

  handleChange (event) {
    const language = event.target.value

    this.setState({language})
    inkdrop.config.set('plugins.spell-checker.language', language)

    event.preventDefault()
  }

  render () {
    const { MessageDialog } = inkdrop.components.classes

    return (
      <MessageDialog className="spellCheck" ref='dialog' title='Choose Language'>
        <div>
          <p>Select a language for spell checking</p>
        </div>
        <br />
        <div className="ui form">
          <select onChange={this.handleChange} value={this.state.language}>
            {
              this.state.languages.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))
            }
          </select>
        </div>
        <br />
        <div>
          <p>
            <strong>Note: You will need to restart for this change to take effect</strong>
          </p>
        </div>
      </MessageDialog>
    )
  }

  choose () {
    console.log('Language Selection!')

    const { dialog } = this.refs

    if (!dialog.isShown) {
      dialog.showDialog()
    } else {
      dialog.dismissDialog()
    }
  }
}
