import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const imageMimeType = /image\/(jpg|jpeg)/i;
const MAX_IMAGE_SIZE_MB = 2;
const allowedImageFormats = ["image/jpeg", "image/jpg", "image/heic"];

function EditModal({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  existingImage,
}) {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [imageErrorMessage, setImageErrorMessage] = useState(""); // Add this line
  const isEmail = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const [emailTouched, setEmailTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  useEffect(() => {
    if (editModal) {
      setFileDataURL(existingImage ? URL.createObjectURL(existingImage) : null);
    }
  }, [editModal, existingImage]);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const [isValid, setIsValid] = useState({
    emailValid: false,
    PhoneValid: false,
  });

  const handleNameChange = (e) => {
    const updatedFormData = { ...formData, username: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const isValidEmail = isEmail.test(email);

    setEmailTouched(true); 

    if (!isValidEmail) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }

    setData({ ...data, email });
  };

  const handlePhoneChange = (e) => {
    if (/[0-9^]{10}$/.test(e.target.value)) {
      setIsValid({ ...isValid, PhoneValid: true });
    } else {
      setIsValid({ ...isValid, PhoneValid: false });
    }
    setData({ ...data, phone: e.target.value });
  };

  const handleAddressChange = (e) => {
    const updatedData = { ...data, address: e.target.value };
    const updatedFormData = { ...formData, address: e.target.value };
    setData(updatedData);
    setFormData(updatedFormData);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFormData({ ...formData, image: null });
      setFile(null);
      setImageErrorMessage(""); 
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setImageErrorMessage(
        `Image size should be less than ${MAX_IMAGE_SIZE_MB}MB.`
      );
      return;
    }

    if (!allowedImageFormats.includes(file.type)) {
      setImageErrorMessage(
        "Invalid image format. Allowed formats: JPEG, HEIC."
      );
      return;
    }

    setImageErrorMessage("");

    setFormData({ ...formData, image: file });
    setFile(file);
    setData({ ...data, image: file });
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("jj");
    let formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("specialist", data.specialist);
    formData.append("address", data.address);
    formData.append("image", file);
    if (!file) {
      toast.error("No file chosen");
      return;
    }

    const config = {
      headers: { auth: localStorage.getItem("access_token") },
    };
    axios
      .put(
        `http://localhost:5000/api/hbms/update_user/${data.id}`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          onClose();
          setData({
            username: "",
            email: "",
            phone: "",
            specialist: "",
            address: "",
            image: "",
          });
          setFile(null);
          toast.success("Record is successfully updated");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      isOpen={editModal}
      toggle={handleEdit}
      centered
      className="modal-right"
    >
      <ModalHeader toggle={handleEdit} onClick={() => onClose()}>
        Updating User
      </ModalHeader>
      <form className="container" onSubmit={handleSubmit}>
        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Name:
                <input
                  type="text"
                  value={data.username}
                  name="username"
                  onChange={handleNameChange}
                  required
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                Email:
                <input
                  type="text"
                  value={data.email}
                  required
                  onChange={handleEmailChange}
                />
              </Label>
              {emailTouched && !isEmailValid && (
                <p style={{ fontSize: "13px", color: "red" }}>
                  Please Enter a Valid Email
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Phone:
                <PhoneInput
                  type="number"
                  value={data.phone}
                  required
                  onChange={(value) => setData({ ...data, phone: value })}
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                Address:
                <input
                  type="text"
                  value={data.address}
                  onChange={handleAddressChange}
                  required
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Image:
                {existingImage && (
                  <img
                    src={URL.createObjectURL(existingImage)}
                    alt="Existing"
                  />
                )}
                <input
                  id="exampleFile"
                  name="file"
                  type="file"
                  accept=".jpg, .jpeg"
                  onChange={handleImageChange}
                />
              </Label>
              {imageErrorMessage && (
                <p style={{ color: "red" }}>{imageErrorMessage}</p>
              )}
            </div>
            <div className="col-md-6">
              {data.image && (
                <img
                  src={`http://localhost:5000${data.image}`}
                  alt=""
                  width="100px"
                />
              )}
              {fileDataURL && (
                <p className="img-preview-wrapper">
                  <img
                    src={fileDataURL}
                    alt="preview"
                    width="130px"
                    height="90px"
                  />
                </p>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={() => onClose()}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
export default EditModal;
