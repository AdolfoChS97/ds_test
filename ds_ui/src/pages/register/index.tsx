import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '@refinedev/core';

export const Register = () => {
    const navigate = useNavigate();
    const { mutate: register } = useRegister();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            register({
                username: values.username,
                email: values.email,
                password: values.password,
                role: values.role
            });
        } catch (error) {
          console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <Card title="Registro de Usuario" style={{ width: 800, margin: '0 auto' }}>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="username"
                    label="Usuario"
                    rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Por favor ingresa tu email' },
                        { type: 'email', message: 'El email no es válido' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                        { required: true, message: 'Por favor ingresa tu contraseña' },
                        { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    label="Confirmar Contraseña"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Por favor confirma tu contraseña' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Las contraseñas no coinciden'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Rol"
                    rules={[{ required: true, message: 'Por favor selecciona un rol' }]}
                >
                    <Select placeholder="Selecciona un rol">
                        <Select.Option value="reader">{'Lector'}</Select.Option>
                        <Select.Option value="content-creator">{'Creador de Contenido'}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Row
                        justify="center"
                        align="middle"
                    >
                      <Col>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {'Registrarme'}
                        </Button>
                      </Col>
                      <Col>
                        <Button type="link" onClick={() => navigate('/')}>
                            {'Volver'}
                        </Button>
                      </Col>
                    </Row>
                    {/* */}
                </Form.Item>
            </Form>
        </Card>
    </Row>
    );
};
