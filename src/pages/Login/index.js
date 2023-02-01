import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { loginStore } = useStore()
    const navigate = useNavigate()
    const onFinish = async (value) => {
        await loginStore.getTokenByFun({
            mobile: value.username,
            code: value.password
        })
        navigate('/', { replace: true })
        message.success('登录成功')
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form
                    validateTrigger={['onBlur', 'onChange']}
                    initialValues={{
                        agree: true
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'this is required'
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号错误',
                            }
                        ]}
                    >
                        <Input size="large" placeholder="账号" />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'this is required'
                            },
                            {
                                len: 6,
                                message: '6位密码'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="密码" />
                    </Form.Item>
                    <Form.Item name="agree" valuePropName="checked">
                        <Checkbox className="login-checkbox-label">
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login