import axios from 'axios';
import { toast } from "react-toastify";

const DeletePatient = (id) => {
  if (window.confirm("Do you want to delete this user?")) {
    axios({
      url: `http://localhost:5000/api/hbms/delete_patient/${id}`,
      method: "delete",
      headers: {
        auth: localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      console.log(res);
      toast.success('Record is Deleted');
    })
    .catch((err) => {
      console.log(err);
    });
}
};

export default DeletePatient;
