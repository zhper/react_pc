import { Layout, Menu, Popconfirm } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { useStore } from '@/store'
import { useEffect } from 'react'

const { Header, Sider } = Layout

const GeekLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { userStore, loginStore, channelStore } = useStore()

    useEffect(() => {
        try {
            userStore.getUserInfo()
            channelStore.loadChannelList()
        } catch { }

    }, [userStore, channelStore])

    const onConfirm = () => {
        loginStore.logOut()
        navigate('/login')
    }
    const onCancel = () => {

    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{userStore.userInfo.name}</span>
                    <span className="user-logout">
                        <Popconfirm
                            title="是否确认退出？"
                            okText="退出"
                            cancelText="取消"
                            onConfirm={onConfirm}
                            onCancel={onCancel}

                        >
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={[pathname]}
                        style={{ height: '100%', borderRight: 0 }}
                        items={[
                            {
                                key: '/',
                                icon: <HomeOutlined />,
                                label: `数据概览`,
                                onClick: () => { navigate('/') }
                            },
                            {
                                key: '/article',
                                icon: <DiffOutlined />,
                                label: '内容管理',
                                onClick: () => { navigate('/article') }
                            },
                            {
                                key: '/publish',
                                icon: <EditOutlined />,
                                label: '发布文章',
                                // to: '/publish',
                                onClick: () => { navigate('/publish') }
                            },
                        ]}
                    >
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(GeekLayout)

