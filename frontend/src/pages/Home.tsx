import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
  });

  console.log(data);

  return <div className=""></div>;
};

export default Home;
