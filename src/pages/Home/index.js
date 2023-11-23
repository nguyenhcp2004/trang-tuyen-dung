import {
  Button,
  Form,
  Input,
  Select,
  Tag,
  Row, Col
} from "antd";
import { useEffect, useState } from "react";
import { getListCity } from "../../services/cityServices";
import { getListTag } from "../../services/tagServices";
import { getListCompany } from "../../services/companyServices ";
import "./Home.scss";
import { useDispatch } from 'react-redux';
import { inputSearch } from "../../actions/search";
import { useNavigate } from 'react-router-dom';
const { CheckableTag } = Tag;

const Home = () => {
  const [form] = Form.useForm();
  const [dataCity, setDataCity] = useState([]);
  const [dataTag, setDataTag] = useState([]);
  const [dataCompany, setDataCompany] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];
  //Danh sách thành phố
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListCity();
      result.forEach((item) => {
        item.label = item.value;
      });

      const object = [
        {
          key: 0,
          value: "All",
          label: "All"
        },
        ...result
      ]
      setDataCity(object);
    };
    fetchApi();
  }, []);
  //Danh sách tag
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListTag();
      setDataTag(result);
    };
    fetchApi();
  }, []);

  const handleFinish = (e) => {
    dispatch(inputSearch(e.city, e.tag));
    navigate("/search");
  };

  let selectedTags = [];

  for (const item of dataTag) {
    selectedTags.push(item.value);
  }

  const handleChange = (tag) => {
    dispatch(inputSearch("", tag.value));
    navigate("/search");
  };

  //Danh sách công ty

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListCompany();
      setDataCompany(result);
    };
    fetchApi();
  }, []);

  return (
    <>
      <div className="search-form">
        <h1>1000+ IT Jobs For Developers</h1>

        <Form
          onFinish={handleFinish}
          layout="vertical"
          form={form}
          initialValues={{
            tag: ""
          }}
        >
          <Row gutter={8}>
            <Col span={2} >
            </Col>
            <Col span={4} >
              <Form.Item name="city">
                <Select allowClear options={dataCity} placeholder="Chọn thành phố" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tag" rules={rules}>
                <Input placeholder="Nhập từ khóa" />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
            <Col span={2}>
            </Col>
          </Row>
        </Form>

        {dataTag.length > 0 && (
          <>
            {dataTag.map(item => (
              <CheckableTag
                key={item.key}
                checked={selectedTags.includes(item)}
                onChange={(checked) => handleChange(item)}
                color="#2db7f5"
              >
                {item.value}
              </CheckableTag>
            ))}
          </>
        )}
      </div>

      <br />
      <br />

      <h2>Danh sách 1 số công ty</h2>

      {dataCompany.length > 0 && (
        <>
          <Row gutter={[20, 10]} className="mb-20 company">
            {dataCompany.map(item => (
              <Col xl={8} lg={8} md={12} sm={24} xs={24} key={item.id}>
                <div className="company__item">
                  <span>Công ty: <strong>{item.companyName}</strong></span>
                  <br />
                  <span>Số nhân sự: <strong>{item.quantityPeople}</strong></span>
                  <br />
                  <span>Địa chỉ: <strong>{item.address}</strong></span>
                  <br />
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}

      <br />
      <Button>Xem thêm</Button>
      <br />
      <div className="content" style={{ height: 250 }}></div>
    </>
  )
}

export default Home;