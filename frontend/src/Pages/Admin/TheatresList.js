import React, { useEffect, useState } from "react";
import { GetAllTheaters, UpdateTheater } from "../../apicalls/theaters";
import { useDispatch } from "react-redux";
import { HideLoading, showLoading } from "../../redux/loadersSlice";
import { message, Table } from "antd";

function TheatresList() {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetAllTheaters();
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleStatusChange = async (theatre) => {
    try {
        console.log(theatre)
      dispatch(showLoading());
      const response = await UpdateTheater({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (owner, rowData) => {
        // console.log("===>", owner);
        return  ( owner.name === undefined ? (
            <>{owner.username}</>
          ) : (
            <>{owner.name}</>
          ))
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive) => {
        if (isActive) {
          return "Approved";
        } else {
          return "Pending / Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, rowData) => {
        return (
          <div className="flex gap-1">
            {rowData.isActive ? (
              <span
                className="underline"
                onClick={() => handleStatusChange(rowData)}
              >
                Block
              </span>
            ) : (
              <span
                className="underline"
                onClick={() => handleStatusChange(rowData)}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={theatres} />
    </div>
  );
}

export default TheatresList;