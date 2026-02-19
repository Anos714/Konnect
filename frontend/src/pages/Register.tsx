import { useState } from "react";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  return <div>Register</div>;
};

export default Register;
