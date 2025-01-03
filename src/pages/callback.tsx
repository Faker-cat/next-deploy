import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import supabase from "../libs/supabase";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const updateUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        return;
      }
      const get_url = `${process.env.NEXT_PUBLIC_API_URL}/users/${data.session?.user.id}/users`;
      const res = await axios.get(get_url);
      switch (res.status) {
        case 200:
          break;
        case 404:
          const post_url = `${process.env.NEXT_PUBLIC_API_URL}/users`;
          const body = {
            id: data.session?.user.id,
            display_name: data.session?.user.user_metadata["name"],
            bio: "",
          };
          await axios.post(post_url, body);
          break;
        default:
          console.error(res);
      }
      router.replace("/questions");
    };
  }, []);

  return <></>;
}
