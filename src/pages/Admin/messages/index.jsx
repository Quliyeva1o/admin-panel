import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { useOutletContext } from 'react-router-dom';
import controller from '../../../services';
import { endpoints } from '../../../services/constants';

const MessagesAdmin = () => {
    const [message, setMessage] = useState([])
    const [messageId, setMessageId] = useState(null)
    const handleRead = (id) => {
        setMessageId(id)
        controller.getOne(endpoints.messages, id).then((res) => {
            setMessage(res)
        })

    }

    useEffect(() => {
        console.log(message);
        console.log(messageId);
        controller.patch(endpoints.messages, messageId, { ...message, "isRead": (!message.isRead) })
    }, [message])
    console.log(message);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',

        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'message',
            dataIndex: 'description',
            key: 'description',
            render: (_, record) => (
                <span style={{ color: record.isRead ? "red" : "blue" }}>{record.description}</span>
            ),},

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { handleRead(record.id) }}>read</Button>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const [users, setAdminID, setLocalAdminID, countries, setCountries, messages, setMessages] = useOutletContext()
    return (<Table columns={columns} dataSource={messages} />);
}
export default MessagesAdmin;



