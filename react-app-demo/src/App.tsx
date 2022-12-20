import React, { useEffect, useState } from "react"
import "./App.css"
import "antd/dist/reset.css"
import { Button, Card, Col, Form, Input, Menu, message, Row, Select, Space, Upload, UploadProps } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import Logo from "./logo.svg"
import request from "./utils/request"
import { RcFile, UploadFile } from "antd/es/upload"
const { Option } = Select

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 }
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}

const App: React.FC = () => {
    const [form] = Form.useForm()

    const onGenderChange = (value: string) => {
        switch (value) {
            case "male":
                form.setFieldsValue({ note: "Hi, man!" })
                return
            case "female":
                form.setFieldsValue({ note: "Hi, lady!" })
                return
            case "other":
                form.setFieldsValue({ note: "Hi there!" })
                break
            default:
        }
    }

    // 表单提交完成
    const onFinish = (values: any) => {
        console.log(values)
    }

    // 重置
    const onReset = () => {
        form.resetFields()
    }

    // 填充表单
    const onFill = () => {
        form.setFieldsValue({
            type: "time",
            value: ""
        })
    }

    // 导航菜单数据
    const items = [
        { label: "首页", key: "item-1" }, // 菜单项务必填写 key
        { label: "其它", key: "item-2" },
        {
            label: "多菜单",
            key: "submenu",
            children: [{ label: "子菜单项", key: "submenu-item-1" }]
        }
    ]
    //  类型
    type TypeProps = "money" | "time"
    const [rebateTypes, setRebateTypes] = useState<Array<TypeProps>>([])
    //  值
    const [rebateValue, setRebateValue] = useState<Array<any>>([])

    // 设置初始type
    const [type, setType] = useState<TypeProps>()

    const init = async () => {
        const {
            data: { data }
        } = await request.post("/json", {})
        console.log("====================================")
        console.log(data)
        console.log("====================================")
        setRebateTypes(data.rebateTypes)
        setRebateValue(data.rebateValue)
    }

    useEffect(() => {
        setType(rebateTypes[0])
        form.setFieldsValue({
            type: rebateTypes[0]
        })
    }, [rebateTypes])

    useEffect(() => {
        init()
    }, [])

    // 图片上传
    // const props: UploadProps = {
    // 	name: 'file',
    // 	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // 	headers: {
    // 		authorization: 'authorization-text'
    // 	},
    // 	onChange(info) {
    // 		if (info.file.status !== 'uploading') {
    // 			console.log(info.file, info.fileList);
    // 		}
    // 		if (info.file.status === 'done') {
    // 			message.success(`${info.file.name} file uploaded successfully`);
    // 		} else if (info.file.status === 'error') {
    // 			message.error(`${info.file.name} file upload failed.`);
    // 		}
    // 	}
    // };

    // 文件上传***************************************************
    const [uploading, setUploading] = useState(false)
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const props: UploadProps = {
        onRemove: file => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            setFileList(newFileList)
        },
        beforeUpload: file => {
            setFileList([...fileList, file])
            return false
        },
        multiple: false,
        maxCount: 1,
        fileList
    }
    // 文件上传
    const handleUpload = () => {
        const formData = new FormData()
        formData.append("file", fileList[0] as any)

        request
            .post("/album/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {
                console.log("====================================")
                console.log(res)
                console.log("====================================")
            })
    }

    return (
        <div className="content">
            <header className="header">
                <a className="logo" href="/">
                    <img src={Logo} alt="" width={50} />
                    <h3>REACT 前后端交互例子</h3>
                </a>
                <Menu selectedKeys={["item-1"]} style={{ height: 50 }} items={items} mode="horizontal" />
            </header>
            <div className="main">
                <Card className="mb-10" title="动态List数据渲染" extra={null} style={{ width: "100%" }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card className="mb-10" title="表单Form选择器" extra={null} style={{ width: "100%" }}>
                    <Form {...layout} labelAlign="left" form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item name="type" label="类型" rules={[{ required: true, message: "请选择类型" }]}>
                            <Select
                                placeholder="请选择类型"
                                allowClear
                                onChange={value => {
                                    setType(value)
                                    form.setFieldsValue({
                                        type: value
                                    })
                                }}>
                                {rebateTypes.map((item, index) => {
                                    return (
                                        <Option key={"type" + index} value={item}>
                                            {item}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="value" label="值" rules={[{ required: true, message: "请选择值" }]}>
                            <Select placeholder="选择值" allowClear>
                                {type &&
                                    rebateValue
                                        .find(item => item["type"] === type)
                                        .value.map((item: number, index: number) => {
                                            return (
                                                <Option key={"value" + index} value={item}>
                                                    {item}
                                                </Option>
                                            )
                                        })}
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        form?.submit()
                                    }}>
                                    Submit
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => {
                                        form?.validateFields(["value"])
                                            .then(res => {
                                                console.log("====================================")
                                                console.log(res)
                                                console.log("====================================")
                                            })
                                            .catch(err => {
                                                console.log("====================================")
                                                console.log(err)
                                                console.log("====================================")
                                            })
                                    }}>
                                    验证表单
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
                <Card className="mb-10" title="上传图片数据格式" extra={null} style={{ width: "100%" }}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>

                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}>
                        {uploading ? "上传中" : "开始上传"}
                    </Button>
                </Card>

                <Card className="mb-10" title="原生表单" extra={null} style={{ width: "100%" }}>
                    <FormDemo />
                </Card>
            </div>
        </div>
    )
}


const FormDemo: React.FC = ()=> {

	return (
        <form>
            <Row className="mb-10">
                <Col span={4}>
                    <label htmlFor="username">用户名</label>
                </Col>
                <Col>
                    <input type="text" placeholder="用户名" required id="username" />
                    <div style={{ color: "red" }}>请输入用户</div>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    <label htmlFor="password">密码</label>
                </Col>
                <Col>
                    <input type="password" required placeholder="密码" id="password" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={e => {
                            console.log("====================================")
                            console.log(e)
                            console.log("====================================")
                        }}>
                        提交
                    </Button>
                </Col>
            </Row>
        </form>
    )
} 

export default App
