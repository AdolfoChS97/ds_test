import { Link, useLogin } from "@refinedev/core";
import { Button, Card, Form, Input, Row, Typography } from "antd";
const { Title } = Typography;

export const Login = () => {
  const { mutate: login, isLoading } = useLogin();

  // Función que se ejecuta al enviar el formulario
  const onFinish = (values: any) => {
      login(values);
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <Card style={{ width: 600 }} bordered>
        <Title level={3} style={{ textAlign: "center" }}>
          {'Iniciar Sesión'}
        </Title>
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, ingresa tu usuario." },
            ]}
          >
            <Input placeholder="Ingresa tu email" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Por favor, ingresa tu contraseña." },
            ]}
          >
            <Input.Password placeholder="Ingresa tu contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              {'Iniciar Sesión'}
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              textAlign: "center",
            }}
          >
            <Link to="/register">{'¿No tienes una cuenta? Regístrate aquí'}</Link>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};
