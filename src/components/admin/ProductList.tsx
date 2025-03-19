import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, InputNumber, Upload } from 'antd';
import { Plus, Pencil, Trash2, Upload as UploadIcon } from 'lucide-react';
import type { Product } from '../../types';

const ProductList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const products = [
    {
      id: '1',
      name: 'Velvet Touch Button-Up',
      price: 120.99,
      description: 'Premium quality button-up shirt with velvet touch finish',
      category: 'shirts',
      image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Brown', 'Black', 'Navy'],
      rating: 4.5,
      reviews: 42
    },
    // Add more products here
  ];

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="Product" className="w-16 h-16 object-cover rounded" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="text"
            icon={<Pencil className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = (product: Product) => {
    Modal.confirm({
      title: 'Delete Product',
      content: `Are you sure you want to delete ${product.name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // Handle delete
        console.log('Deleting product:', product.id);
      },
    });
  };

  const handleSubmit = (values: any) => {
    if (editingProduct) {
      // Handle update
      console.log('Updating product:', { ...editingProduct, ...values });
    } else {
      // Handle create
      console.log('Creating product:', values);
    }
    setIsModalVisible(false);
    form.resetFields();
    setEditingProduct(null);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Products</h2>
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              setEditingProduct(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add Product
          </Button>
        </div>
      </div>
      
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={720}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editingProduct || {}}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select>
              <Select.Option value="shirts">Shirts</Select.Option>
              <Select.Option value="pants">Pants</Select.Option>
              <Select.Option value="accessories">Accessories</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="sizes"
            label="Sizes"
            rules={[{ required: true, message: 'Please select sizes' }]}
          >
            <Select mode="multiple">
              <Select.Option value="XS">XS</Select.Option>
              <Select.Option value="S">S</Select.Option>
              <Select.Option value="M">M</Select.Option>
              <Select.Option value="L">L</Select.Option>
              <Select.Option value="XL">XL</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="colors"
            label="Colors"
            rules={[{ required: true, message: 'Please select colors' }]}
          >
            <Select mode="multiple">
              <Select.Option value="Black">Black</Select.Option>
              <Select.Option value="White">White</Select.Option>
              <Select.Option value="Navy">Navy</Select.Option>
              <Select.Option value="Brown">Brown</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Upload.Dragger
              name="file"
              multiple={false}
              action="/api/upload"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <UploadIcon className="w-8 h-8 mx-auto text-gray-400" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingProduct ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;