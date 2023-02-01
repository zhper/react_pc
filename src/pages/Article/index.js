import { Link, useNavigate } from 'react-router-dom'
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'


const { Option } = Select
const { RangePicker } = DatePicker


const Article = () => {
    //获取频道
    const { channelStore } = useStore()

    const [list, setlist] = useState({
        list: [],
        count: 0
    })
    const [params, setparams] = useState({
        page: 1,
        per_page: 10,
        id: 0
    })
    //通过params的文章参数获取文章列表
    useEffect(() => {
        const loadList = async () => {
            const res = await http.get('/mp/articles', { params })
            const { results, total_count } = res.data
            setlist({
                list: results,
                count: total_count
            })
        }
        loadList()
    }, [params])
    //分页功能改变params
    const pageChange = (page) => {
        setparams({
            ...params,
            page
        })
    }

    //删除文章
    const delArticle = async (data) => {
        await http.delete(`/mp/articles/${data.id}`)
        setparams({
            ...params,
            id: data.id
        })
    }
    //跳转到发布
    const navigate = useNavigate()
    const goPublish = async (data) => {
        navigate(`/publish?id=${data.id}`)
    }

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined
                                onClick={() => goPublish(data)}
                            />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => delArticle(data)}
                        />
                    </Space>
                )
            }
        }
    ]

    const onFinish = (values) => {
        const { channel_id, date, status } = values
        const tmp_params = {}
        if (status !== -1) {
            tmp_params.status = status
        } if (channel_id) {
            tmp_params.channel_id = channel_id
        } if (date) {
            tmp_params.begin_pubdate = date[0].format('YYYY-MM-DD')
            tmp_params.end_pubdate = date[1].format('YYYY-MM-DD')
        }
        setparams({
            ...params,
            ...tmp_params
        })

    }
    return (
        <div>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    onFinish={onFinish}
                    initialValues={{ status: 0 }}
                >
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            {channelStore.channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}

                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>


            <Card title={`根据筛选条件共查询到 ${list.count} 条结果：`}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={list.list}
                    pagination={
                        {
                            pageSize: params.per_page,
                            total: list.count,
                            onChange: pageChange
                        }
                    }
                />
            </Card>
        </div>
    )
}

export default observer(Article) 