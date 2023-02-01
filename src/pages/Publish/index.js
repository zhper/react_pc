import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useState, useRef, useEffect } from 'react'
import { http } from '@/utils'
const { Option } = Select

const Publish = () => {
    const { channelStore } = useStore()
    const [fileList, setfileList] = useState([])
    const [imgCount, setimgCount] = useState(1)
    const cacheImgList = useRef()
    const navigate = useNavigate()
    const form = useRef(null)

    const [params] = useSearchParams()
    const id = params.get('id')

    const onUploadChange = ({ fileList }) => {
        const formatList = fileList.map(file => {
            if (file.response) {
                return {
                    url: file.response.data.url
                }
            }
            return file
        })
        setfileList(formatList)
        cacheImgList.current = formatList
    }
    const radioChange = (e) => {
        setimgCount(e.target.value)
    }
    useEffect(() => {
        console.log(imgCount)
        if (!cacheImgList.current || cacheImgList.current.length === 0) return
        if (imgCount === 1) {
            console.log('file11')
            const img = [cacheImgList.current[0]]
            setfileList(img)
        } else if (imgCount === 3) {
            console.log('file33')
            setfileList(cacheImgList.current)
        }
    }, [imgCount])


    const onFinish = async (values) => {
        const { channel_id, content, title, type } = values
        const params = {
            channel_id,
            content,
            title,
            type,
            cover: {
                type,
                images: fileList.map(item => item.url)
            }
        }
        if (id) {
            await http.put(`/mp/articles/${id}?draft=false`, params)
        } else {
            await http.post('/mp/articles?draft=false', params)
        }
        navigate('/article')
        message.success('成功')

    }
    //文案适配
    useEffect(() => {
        console.log(id)
        const loadDetail = async () => {
            const res = await http.get(`/mp/articles/${id}`)
            form.current.setFieldsValue({ ...res.data, type: res.data.cover.type })
            setfileList(res.data.cover.images.map(url => ({ url })))
            setimgCount(res.data.cover.type)
            cacheImgList.current = res.data.cover.images.map(url => ({ url }))
        }

        if (id) {
            loadDetail()
        }

    }, [id])
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{id ? '更新文章' : '发布文章'}</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1, content: 'this is content' }}
                    ref={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelStore.channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}

                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={radioChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imgCount > 0 && (
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList
                                action="http://geek.itheima.net/v1_0/upload"
                                fileList={fileList}
                                onChange={onUploadChange}
                                multiple={imgCount > 1}
                                maxCount={imgCount}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>
                        )}

                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}

                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {id ? '更新文章' : '发布文章'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default observer(Publish) 