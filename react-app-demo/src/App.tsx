import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Button, Card, Form, Input, Menu, message, Select, Space, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Logo from './logo.svg';
const { Option } = Select;

const layout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 16 }
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 }
};

const App: React.FC = () => {
	const [form] = Form.useForm();

	const onGenderChange = (value: string) => {
		switch (value) {
			case 'male':
				form.setFieldsValue({ note: 'Hi, man!' });
				return;
			case 'female':
				form.setFieldsValue({ note: 'Hi, lady!' });
				return;
			case 'other':
				form.setFieldsValue({ note: 'Hi there!' });
				break;
			default:
		}
	};

	// 表单提交完成
	const onFinish = (values: any) => {
		console.log(values);
	};

	// 重置
	const onReset = () => {
		form.resetFields();
	};

	// 填充表单
	const onFill = () => {
		form.setFieldsValue({
			note: 'Hello world!',
			gender: 'male'
		});
	};

	// 导航菜单数据
	const items = [
		{ label: '首页', key: 'item-1' }, // 菜单项务必填写 key
		{ label: '其它', key: 'item-2' },
		{
			label: '多菜单',
			key: 'submenu',
			children: [{ label: '子菜单项', key: 'submenu-item-1' }]
		}
	];

	// 图片上传
	const props: UploadProps = {
		name: 'file',
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		headers: {
			authorization: 'authorization-text'
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	return (
		<div className="content">
			<header className="header">
				<a className="logo" href="/">
					<img src={Logo} alt="" width={50} />
					<h3>REACT 前后端交互例子</h3>
				</a>
				<Menu selectedKeys={['item-1']} style={{ height: 50 }} items={items} mode="horizontal" />
			</header>
			<div className="main">
				<Card className="mb-10" title="动态List数据渲染" extra={null} style={{ width: '100%' }}>
					<p>Card content</p>
					<p>Card content</p>
					<p>Card content</p>
				</Card>
				<Card className="mb-10" title="表单Form选择器" extra={null} style={{ width: '100%' }}>
					<Form {...layout} labelAlign="left" form={form} name="control-hooks" onFinish={onFinish}>
						<Form.Item name="note" label="Note" rules={[{ required: true }]}>
							<Input placeholder="please enter notes" />
						</Form.Item>
						<Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
							<Select
								placeholder="Select a option and change input text above"
								onChange={onGenderChange}
								allowClear>
								<Option value="male">male</Option>
								<Option value="female">female</Option>
								<Option value="other">other</Option>
							</Select>
						</Form.Item>
						<Form.Item
							noStyle
							shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
							{({ getFieldValue }) =>
								getFieldValue('gender') === 'other' ? (
									<Form.Item
										name="customizeGender"
										label="Customize Gender"
										rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								) : null
							}
						</Form.Item>
						<Form.Item {...tailLayout}>
							<Space>
								<Button type="primary" htmlType="submit">
									Submit
								</Button>
								<Button htmlType="button" onClick={onReset}>
									Reset
								</Button>
								<Button type="link" htmlType="button" onClick={onFill}>
									Fill Form
								</Button>
							</Space>
						</Form.Item>
					</Form>
				</Card>
				<Card className="mb-10" title="上传图片数据格式" extra={null} style={{ width: '100%' }}>
					<Upload {...props}>
						<Button icon={<UploadOutlined />}>Click to Upload</Button>
					</Upload>
				</Card>
			</div>
		</div>
	);
};

export default App;
