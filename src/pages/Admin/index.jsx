import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/header";
import { useEffect, useState } from "react";
import controller from "../../services/index";
import { endpoints } from "../../services/constants";
import useLocalStorage from "../../hooks/useLocalStorage";

const AdminRoot = () => {
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [localAdminID, setLocalAdminID] = useLocalStorage('adminID', null);
  const navigate = useNavigate();
  const localID = JSON.parse(localStorage.getItem('adminID'));
  const [adminID, setAdminID] = useState(localID ? localID : null);

  useEffect(() => {
    controller.getAll(endpoints.users).then((resp) => {
      setUsers(resp.data);
    });
    controller.getAll(endpoints.countries).then((resp) => {
      setCountries(resp.data);
    })
    controller.getAll(endpoints.messages).then((resp) => {
      setMessages(resp.data);
    })
    if (adminID === null) {
      navigate('/admin/login');
    }
  }, [adminID]);
  return (
    <>
      <AdminHeader adminID={adminID} setAdminID={setAdminID} setLocalAdminID={setLocalAdminID} />
      <Outlet context={[users, setAdminID, setLocalAdminID, countries, setCountries, messages, setMessages]} />
    </>
  );
};

export default AdminRoot;
