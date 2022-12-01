import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Button, Card, Form, Input, message, Select, Space, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 16 }
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 }
};

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

	const onFinish = (values: any) => {
		console.log(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	const onFill = () => {
		form.setFieldsValue({
			note: 'Hello world!',
			gender: 'male'
		});
	};
	return (
		<div className="App">
			<Card className="mb-10" title="动态数据渲染" extra={null} style={{ width: '100%' }}>
				<p>Card content</p>
				<p>Card content</p>
				<p>Card content</p>
			</Card>

			<Card className="mb-10" title="表单选择器" extra={null} style={{ width: '100%' }}>
				<Form {...layout} labelAlign="left" form={form} name="control-hooks" onFinish={onFinish}>
					<Form.Item name="note" label="Note" rules={[{ required: true }]}>
						<Input />
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
								<Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
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
								Fill form
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Card>

			<Card className="mb-10" title="上传图片" extra={null} style={{ width: '100%' }}>
				<Upload {...props}>
					<Button icon={<UploadOutlined />}>Click to Upload</Button>
				</Upload>
			</Card>
		</div>
	);
};

export default App;
