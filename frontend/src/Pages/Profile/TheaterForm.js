import { Form, message, Modal, Col } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTheater, UpdateTheater } from "../../apicalls/theaters";
import Button from "../../components/Button";
import { HideLoading, showLoading } from "../../redux/loadersSlice";

function TheaterForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    
    try {
      dispatch(showLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheater(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheater(values);
      }

      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
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

  return (
    <Modal
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={showTheatreFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input theatre name!" }]}
        >
          <input type="text" />
        </Form.Item>

        <Col span={22}>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please input theatre address!" },
            ]}
          >
            <textarea type="text" />
          </Form.Item>
        </Col>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input theatre phone number!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input theatre email!" }]}
        >
          <input type="text" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default TheaterForm;
