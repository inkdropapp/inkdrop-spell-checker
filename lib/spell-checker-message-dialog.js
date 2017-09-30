'use babel';

import { React } from 'inkdrop';
import { CompositeDisposable } from 'inkdrop';

export default class SpellCheckerMessageDialog extends React.Component {

  componentWillMount () {
    // Events subscribed to in Inkdrop's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this dialog
    this.subscriptions.add(inkdrop.commands.add(document.body, {
      'spell-checker:toggle': () => this.toggle()
    }));
  }

  componentWillUnmount () {
    this.subscriptions.dispose();
  }

  render() {
    const { MessageDialog } = inkdrop.components.classes;
    return (
      <MessageDialog ref='dialog' title='SpellChecker'>
        SpellChecker was toggled!
      </MessageDialog>
    );
  }

  toggle() {
    console.log('SpellChecker was toggled!');
    const { dialog } = this.refs;
    if (!dialog.isShown) {
      dialog.showDialog();
    } else {
      dialog.dismissDialog();
    }
  }
}
