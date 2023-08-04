import axios from 'axios';
import { toast } from 'react-toastify';

const handleDelete = (id, type) => {
  if (window.confirm('Do you want to delete this user?')) {
    axios
      .delete(`http://localhost:5000/api/hbms/delete_${type}/${id}`, {
        headers: {
          auth: localStorage.getItem('access_token'),
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

export default handleDelete;
