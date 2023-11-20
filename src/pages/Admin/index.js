import { Row, Col, Card } from "antd";
import { useEffect, useState } from "react";
import { getJobOnStatus, getListJobCompany,  getJobOffStatus } from "../../services/jobServices";
import { getCookie } from "../../helpers/cookies";
import { getCv, getReadCv } from "../../services/cvServices";
import { getCompany } from "../../services/companyServices ";


const Admin = () => {
    const [dataJob, setDataJob] = useState([]);
    const [jobOnStatus, setJobOnStatus] = useState([]);
    const [dataCv, setDataCv] = useState([]);
    const [readCv, setReadCv] = useState([]);
    const [dataCompany, setDataCompany] = useState([]);

    const id = getCookie("id");
    useEffect(() => {
        const fetchApi = async () => {
            const listJob = await getListJobCompany(id);
            const jobOnStatus = await getJobOnStatus(id);
            const listCv = await getCv(id);
            const readCv = await getReadCv(id);
            const company = await getCompany(id);

            setDataJob(listJob);
            setJobOnStatus(jobOnStatus);
            setDataCv(listCv);
            setReadCv(readCv);
            setDataCompany(company);
          };
          fetchApi();
    }, [])

    return (
        <>
            <h2>Tổng quan</h2>
            <Row gutter={[20, 10]} className="mb-20 " style={{ lineHeight: 2 }}>
                <Col xl={8} lg={8} md={12} sm={24} xs={24} >
                    <Card title="Job">
                            <span>Số lượng job: <strong>{dataJob.length}</strong>  </span>
                            <br />
                            <span>Job đang bật: <strong> {jobOnStatus.length} </strong>
                               
                            </span>
                            <br />
                            <span>Job đang tắt: <strong> {dataJob.length - jobOnStatus.length} </strong></span>
                            <br />
                    </Card>
                </Col>
                <Col xl={8} lg={8} md={12} sm={24} xs={24} >
                    <Card title="CV">
                            <span>Số lượng CV: <strong>{dataCv.length}</strong> </span>
                            <br />
                            <span>CV đã đọc:
                            <strong>{readCv.length}</strong>
                            </span>
                            <br />
                            <span>CV chưa đọc: <strong>{dataCv.length - readCv.length}</strong> </span>
                            <br />
                    </Card>
                </Col>
                <Col xl={8} lg={8} md={12} sm={24} xs={24} >
                    <Card title="Thông tin công ty">
                            <span>Tên công ty: <strong>{dataCompany.companyName}</strong>  </span>
                            <br />
                            <span>Email: <strong>{dataCompany.email}</strong>   </span>
                            <br />
                            <span>Số điện thoại:  <strong>{dataCompany.phone}</strong></span>
                            <br />
                            <span>Số nhân viên: <strong>{dataCompany.quantityPeople}</strong> </span>
                            <br />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Admin;