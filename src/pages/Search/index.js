import { Tag, Row, Col, Card } from "antd";
import { useSelector } from "react-redux";
import { getListJob } from "../../services/jobServices";
import { useState, useEffect } from "react";
import { getListCompany } from "../../services/companyServices ";

import { Link } from "react-router-dom";

const Search = () => {
    const inputSearch = useSelector(state => state.searchReducer);
    const [dataJob, setDataJob] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getListJob(inputSearch.tag, inputSearch.city);
            const data = await getListCompany();
            for (const item of result) {
                for (const company of data) {
                    if (item.idCompany === company.id) {
                        item.companyName = company.companyName;
                    }
                }
            }
            setDataJob(result);
        };
        fetchApi();
    }, []);

    console.log(dataJob);

    return (
        <>
            {inputSearch && (
                <>
                    <br />
                    <strong>Kết quả tìm kiếm: </strong>
                    {inputSearch.city && (
                        <Tag>{inputSearch.city}</Tag>
                    )}
                    <Tag>{inputSearch.tag}</Tag>
                    <br />
                    <br />

                    {dataJob.length > 0 && (
                        <>
                            <Row gutter={[20, 10]} className="mb-20 " style={{ lineHeight: 2 }}>
                                {dataJob.map(item => (
                                    <Col xl={8} lg={8} md={12} sm={24} xs={24} key={item.id}>
                                        <Card title={<Link to={"/job/" + item.id}>{item.name}</Link>}>
                                            <div className="company__info" style={{ letterSpacing: 1.5 }}>
                                                <span>Ngôn ngữ:
                                                    {item.tags.map((tag, index) => (
                                                        <Tag key={index} color="cyan" className="tag">{tag}</Tag>
                                                    ))}
                                                </span>
                                                <br />
                                                <span>Thành phố:
                                                    {item.city.map((city, index) => (
                                                        <Tag key={index} color="volcano" className="tag">{city}</Tag>
                                                    ))}
                                                </span>
                                                <br />
                                                <span>Lương: <strong>{item.salary}$</strong></span>
                                                <br />
                                                <span>Công ty: <strong>{item.companyName}</strong></span>
                                                <br />
                                                <span>Ngày tạo: <strong>{item.createAt}</strong></span>
                                                <br />
                                            </div>
                                        </Card>
                                        {/* <div className="company__item">
                                            <div className="name"><Link to={"/job/" + item.id}>{item.name}</Link></div>
                                            <div className="company__info" style={{ letterSpacing: 1.5 }}>
                                                <span>Ngôn ngữ:
                                                    {item.tags.map((tag, index) => (
                                                        <Tag key={index} color="cyan" className="tag">{tag}</Tag>
                                                    ))}
                                                </span>
                                                <br />
                                                <span>Thành phố:
                                                    {item.city.map((city, index) => (
                                                        <Tag key={index} color="volcano" className="tag">{city}</Tag>
                                                    ))}
                                                </span>
                                                <br />
                                                <span>Lương: <strong>{item.salary}$</strong></span>
                                                <br />
                                                <span>Công ty: <strong>{item.companyName}</strong></span>
                                                <br />
                                                <span>Ngày tạo: <strong>{item.createAt}</strong></span>
                                                <br />
                                            </div>

                                        </div> */}
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </>
            )}

        </>
    )
}
export default Search;