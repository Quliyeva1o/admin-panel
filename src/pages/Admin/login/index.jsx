import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ username: "", password: "" });
  const [users, setAdminID, setLocalAdminID] = useOutletContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const foundAdmin = users.find(
      (x) =>
        x.username == admin.username &&
        x.password == admin.password &&
        x.role == "admin"
    );
      
    if (foundAdmin) {
      setAdminID(foundAdmin.id);
      setLocalAdminID(foundAdmin.id);
      toast.success("Admin logged in!",{
        autoClose: 1500
      })
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } else {
      toast.error("username or password is incorrect!");
      setAdmin({ username: "", password: "" });
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          marginTop: "200px",
        }}
      >
        <TextField
          value={admin.username}
          onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
          id="outlined-basic"
          type="text"
          label="admin username"
          variant="outlined"
        />
        <TextField
          value={admin.password}
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          id="outlined-basic"
          type="password"
          label="admin password"
          variant="outlined"
        />
        <Button variant="contained" type="submit" color="error">
          Sign In
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AdminLogin;
