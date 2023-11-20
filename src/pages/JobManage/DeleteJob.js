import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { deleteJob } from "../../services/jobServices";

const DeleteJob = (props) => {
    const { record, onReload } = props;

    const handleConfirmDelete = async () => {
        await deleteJob(record.id);
        onReload();
    }

    return (
        <>
            <Tooltip title="Xóa bản ghi">
                <Popconfirm
                    title="Xóa job này"
                    description="Bạn có chắc chắn muốn xóa job này?"
                    icon={
                        <QuestionCircleOutlined
                            style={{
                                color: 'red',
                            }}
                        />
                    }
                    onConfirm={handleConfirmDelete}
                >
                    <Button danger icon={<DeleteOutlined />}
                        style={{ margin: 5 }}
                    ></Button>
                </Popconfirm>

            </Tooltip>
        </>
    )
}

export default DeleteJob;