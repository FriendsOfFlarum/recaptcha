import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Mithril from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import RecaptchaTest from './RecaptchaTest';

export default class RecaptchaPage extends ExtensionPage {
  sections(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>): ItemList<unknown> {
    const items = super.sections(vnode);

    const settings = { ...this.settings };

    for (const key in settings) {
      if (settings[key] instanceof Function) {
        settings[key] = settings[key].call(this);
      }
    }

    items.add('recaptcha', <RecaptchaTest settings={settings} />);

    items.setPriority('permissions', -1);

    return items;
  }
}
