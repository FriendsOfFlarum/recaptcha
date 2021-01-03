import Component from 'flarum/Component';

export default class Recaptcha extends Component {
    view() {
        return (
            <div className="Form-group">
                <div className="g-recaptcha" />
            </div>
        );
    }

    oncreate(vnode) {
        super.oncreate(vnode);
        this.attrs.state.render(vnode.dom.querySelector('.g-recaptcha'));
    }
}
