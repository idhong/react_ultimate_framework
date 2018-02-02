import React from 'react';
import { Modal, Button ,Form, Icon, Input, Checkbox} from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem
                    label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入手机号!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                    )}
                </FormItem>
                <FormItem
                    label="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <div className="flex_center_vh">
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <a href="/register" className="margin_left_auto">没有账号？立即免费注册</a>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default function LoginModal(Comp) {

    return class WrapperComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state={
                visible:false
            }
        }

        showModal = () => {
            this.setState({
                visible: true,
            });
        }

        handleOk = (e) => {
            this.setState({
                visible: false,
            });
        }
        handleCancel = (e) => {
            this.setState({
                visible: false,
            });
        }

        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        }

        render() {
            return (
                <div>
                    <Modal
                        title="登录帐号"
                        visible={this.state.visible}
                        okText="登录"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <WrappedNormalLoginForm />
                    </Modal>
                    <Comp {...this.props} showLoginModal={this.showModal}/>
                </div>
            )
        }
    }
}