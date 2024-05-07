import { TextField } from '@mui/material';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import controller from '../../../services';
import { endpoints } from '../../../services/constants';
import TextArea from 'antd/es/input/TextArea';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useOutletContext } from 'react-router-dom';
import { nanoid } from 'nanoid';

const ContactUs = () => {
const [countries, setCountries,setMessages]=useOutletContext()
  const [newMessage, setNewMessage] = useState({
   
    fullName: "",
    email: "",
    title: "",
    desctiption: "",
    isRead: false
  });
  console.log("newmess", newMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    controller.post(endpoints.messages, newMessage)
    toast.success("your message was send!", {
      autoClose: 1500,
    });
    setMessages((currmes) => {
      return [...currmes, newMessage];
    });
    setNewMessage({
     
      fullName: "",
      email: "",
      title: "",
      desctiption: "",
      isRead: false
    });
  }


  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: '30px auto', gap: '18px' }}>
        <TextField value={newMessage.fullName} onChange={(e) => { setNewMessage({ ...newMessage, fullName: e.target.value }) }} id="outlined-basic" type="text" label="full name" variant="outlined" />
        <TextField value={newMessage.email} onChange={(e) => { setNewMessage({ ...newMessage, email: e.target.value }) }} id="outlined-basic" type="email" label="email" variant="outlined" />
        <TextField value={newMessage.title} onChange={(e) => { setNewMessage({ ...newMessage, title: e.target.value }) }} id="outlined-basic" type="text" label="title" variant="outlined" />
        <TextArea  onChange={(e) => { setNewMessage({ ...newMessage, description: e.target.value }) }} aria-label="empty textarea" placeholder="Message" />
        <Button type='submit' htmlType='submit'>send</Button>
      </form>
      <ToastContainer />

    </>
  );
};

export default ContactUs;
