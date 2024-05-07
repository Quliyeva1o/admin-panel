import { useOutletContext } from "react-router-dom";
import { Input, Table } from "antd";
import Container from "../../../components/Client/container";
import { Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import controller from "../../../services/index";
import { endpoints } from "../../../services/constants";
import { useState } from "react";
import { Modal } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { TextArea } = Input;

const AdminCountries = () => {
  const data = useOutletContext();
  const [editingCountry, setEditingCountry] = useState(null);
  const countries = data[3];
  const setCountries = data[4];
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    //form submit
    const updated = {
      name: editingCountry.name,
      flagImg: editingCountry.flagImg,
      description: editingCountry.description,
      population: editingCountry.population,
      capital: editingCountry.capital,
    };
    controller.patch(endpoints.countries, editingCountry.id, updated);
    //state update
    setCountries((currentCountries) => {
      const idx = currentCountries.findIndex((x) => x.id == editingCountry.id);
      currentCountries.splice(idx, 1, editingCountry);
      return [...currentCountries];
    });
    toast.success('country updated successfully!');
    setIsModalOpen(false);
    setEditingCountry(null);
  };
  const handleCancel = () => {
    setEditingCountry(null);
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: countries.map((country) => {
        return {
          text: country.name,
          value: country.name,
        };
      }),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) =>
        a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim()),
    },
    {
      title: "Flag",
      dataIndex: "flagImg",
      render: (record, value) => {
        return (
          <img
            width={100}
            height={50}
            style={{ objectFit: "cover" }}
            src={record}
            alt={value.name}
            title={value.name}
          />
        );
      },
    },
    {
      title: "Population",
      dataIndex: "population",
      render: (record) => {
        const displayPopulation = (record / 1_000_000).toFixed(3);
        return <span>{displayPopulation} million</span>;
      },
      sorter: (a, b) => a.population - b.population,
    },
    {
      title: "Edit",
      render: (record) => { 
        return (
          <Button
            onClick={() => {
              showModal();
              setEditingCountry(record);
            }}
            variant="outlined"
            color="primary"
          >
            <ModeEditIcon />
          </Button>
        );
      },
    },
    {
      title: "Delete",
      render: (record) => {
        return (
          <Button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  setCountries((currentCountries) => {
                    return [
                      ...currentCountries.filter((x) => x.id != record.id),
                    ];
                  });
                  //api delete
                  controller.delete(endpoints.countries, record.id);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                }
              });
            }}
            variant="outlined"
            color="error"
          >
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Container>
      <Table
        columns={columns}
        dataSource={countries}
        onChange={onChange}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        pagination={{
          defaultPageSize: 3,
          pageSizeOptions: ["2", "5", "10"],
          showSizeChanger: true,
        }}
      />
      <ToastContainer/>
      <Modal
        title="Edit Country Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input
            onChange={(e) =>
              setEditingCountry({ ...editingCountry, name: e.target.value })
            }
            value={editingCountry?.name}
            type="text"
            placeholder="name"
          />
          <Input
            onChange={(e) =>
              setEditingCountry({ ...editingCountry, capital: e.target.value })
            }
            value={editingCountry?.capital}
            type="text"
            placeholder="capital"
          />
          <Input
            onChange={(e) =>
              setEditingCountry({
                ...editingCountry,
                population: e.target.value,
              })
            }
            value={editingCountry?.population}
            type="text"
            placeholder="population"
          />
          <Input
            onChange={(e) =>
              setEditingCountry({ ...editingCountry, flagImg: e.target.value })
            }
            value={editingCountry?.flagImg}
            type="text"
            placeholder="flag image source"
          />
          <TextArea
            onChange={(e) =>
              setEditingCountry({
                ...editingCountry,
                description: e.target.value,
              })
            }
            value={editingCountry?.description}
            rows={4}
            placeholder="maxLength is 6"
          />
        </form>
      </Modal>
    </Container>
  );
};

export default AdminCountries;
