import Info from "./Info";
import Image from "./Image";

const Account = () => {
  return (
    <>
      <section
        style={{
          display: "flex",
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#f8f5ed",
        }}
      >
        <Image />
        <Info />
      </section>
    </>
  );
};

export default Account;
