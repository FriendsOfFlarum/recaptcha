import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Mithril from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
export default class RecaptchaPage extends ExtensionPage {
    sections(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>): ItemList<unknown>;
}
