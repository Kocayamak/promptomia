"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user?.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Bu postu silmek istediğinize emin misiniz?");

    if (hasConfirmed) {
        try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
                method: "DELETE",
            });

            const filteredPosts = posts.filter((p) => p._id !== post._id);
            
            setPosts(filteredPosts);    
        } catch (error) {
            console.log(error)
        }
    }
  };

  return (
    <Profile
      name="Benim"
      desc="Profiline Hoşgeldin"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
