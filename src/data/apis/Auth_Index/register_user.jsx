import axios from "axios";
import { domain } from "../../../store";
import { toast } from "react-toastify";

export const userRegister = async (values) => {
  let final;
  await axios
    .post(domain + "/api/auth/local/register", {
      username: values.username,
      email: values.email,
      password: values.password,
    })
    .then(async (info) => {
      await axios
        .put(domain + `/api/users/${info.data.user.id}`, {
          phone: values.phone,
        })
        .then(() => {
          final = info.data;
          toast.success("User Created Successfully", {
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error("Error: phone or Username are already taken ", {
            autoClose: 2000,
          });
        });
    })
    .catch((error) => {
      toast.error("Error: Email or Username are already taken ", {
        autoClose: 2000,
      });
    });
  return final;
};