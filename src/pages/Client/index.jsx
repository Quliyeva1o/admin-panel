import { Outlet } from "react-router-dom";
import ClientHeader from "../../components/Client/header";
import { useEffect, useState } from "react";
import controller from "../../services/index";
import { endpoints } from "../../services/constants";

const ClientRoot = () => {
  //get countries
  const [countries, setCountries] = useState([]);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    controller.getAll(endpoints.countries).then((resp) => {
      setCountries(resp.data);
    });
    controller.getAll(endpoints.messages).then((resp) => {
      setMessages(resp.data);
    });
  }, []);
  return (
    <>
      <ClientHeader />
      <Outlet context={[countries, setCountries,setMessages]}/>
    </>
  );
};

export default ClientRoot;
