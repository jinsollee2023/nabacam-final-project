import { useEffect, useState } from "react";

interface AddMemberModalProps {
  setUpdateMemberData: (updatdMemberData: {
    name: string;
    team: string;
    contact: {
      email: string;
      phone: string;
    };
  }) => void;
}

const AddMemberModal = ({ setUpdateMemberData }: AddMemberModalProps) => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setUpdateMemberData({
      name,
      team,
      contact: {
        email,
        phone,
      },
    });
  }, [name, team, email, phone]);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={team} onChange={(e) => setTeam(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
  );
};

export default AddMemberModal;
