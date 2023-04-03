import axios from "axios";
import { baseURL } from "../apiurl";

// useEffect에서 불러다 쓸 예정
const getAction = async (dispatch) => {
  await axios
    .get(`${baseURL}/todo/all`) //.get(baseUrl+'/todo/all')
    .then((Response) => {
      console.log(Response.data);
      dispatch({ type: "LIST", todos: Response.data }); // store에 있는 response에 보내야 한다. usedispatch 이용
    })
    .catch((error) => {
      console.log(error);
    });
};

const insertAction = async (input) => {
  await axios.post(baseURL + "/todo/", { todoname: input }).then((response) => {
    window.location.replace("/");
  });
};

const deleteAction = async (id) => {
  await axios
    .delete(baseURL + "/todo/" + id)
    .then((response) => {
      window.location.replace("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateAction = async (id, completed) => {
  await axios
    .put(baseURL + "/todo/" + id + "/" + completed)
    .then((response) => {
      window.location.replace("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getAction, insertAction, deleteAction, updateAction };
