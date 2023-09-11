import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Messages from "../../components/chat/Messages";
import supabase from "../../config/supabaseClient";
import { toast } from "react-toastify";
import { Room } from "src/components/chat/Room";
import { useUserStore } from "../../store/useUserStore";
import MenuTabBarComp from "../common/MenuTabBarComp";

const ChatComp = () => {
  const communicationMenu = ["커뮤니케이션"];

  const { user } = useUserStore();
  const userId = user.userId; // users테이블의 userId를 user_id컬럼에 삽입, rpc에도 삽입
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false }); // 가장 최신순 맨 위에
      console.log(data);
      if (data) setRooms(data);
    };
    getRooms();
  }, []);

  const handleCreateRoom = async () => {
    const { data, error } = await supabase.rpc("create_room", {
      roomname: "test name",
      user_id: userId,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data) {
      const room_id = data.room_id;
      navigate(`/chat/${room_id}`);
    }
  };
  return (
    <section
      id="whole-page"
      className="flex h-screen items-center justify-center"
    >
      <MenuTabBarComp menu={communicationMenu} />
      <main
        id="container"
        className="flex h-full w-full flex-1 flex-col items-stretch bg-aliceblue py-10 px-20 text-gray-800"
      >
        <h1 className="bg-green-200 px-4 py-2 text-4xl">
          {/* 1.제목 */}
          <p>
            <Link to={"/chat"}>
              <a>Work Wave Chat</a>
            </Link>
          </p>
          {/* 2.enter individual room */}
          <button
            onClick={handleCreateRoom}
            className="ml-4 rounded border bg-red-200 p-2 text-xs"
          >
            New room
          </button>
          {/* 3.enter openchat room */}
          <button
            className="ml-4 rounded border bg-red-200 p-2 text-xs"
            onClick={() =>
              navigate("/chat/96c2540e-1f84-4819-8a18-9e895f24114a")
            }
          >
            Open Chat
          </button>
        </h1>
        {/* room lists */}
        <div className="flex-1 bg-gray-100 p-4">
          {rooms.map((room) => (
            <div key={room.room_id} className="mt-5">
              <p>
                <Link to={`/chat/${room.room_id}`}>
                  <a>{room.roomname ?? "Untitled"}</a>
                </Link>
              </p>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default ChatComp;
