import React, { ChangeEvent, useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import { useUserStore } from "src/zustand/useUserStore";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

const Account = () => {
  // useStates
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedWorkField, setUpdatedWorkField] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedProjectId, setUpdatedProjectId] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [images, setImages] = useState<
    import("@supabase/storage-js/dist/module/lib/types").FileObject[]
  >([]);
  // console.log("images>", images);
  console.log(images[0]);

  // zustand
  const { userId, email, setUserEmail } = useUserStore();
  // console.log(userId);

  /**
   * GET
   */
  const testUserId = "df509ff5-cdd4-4b3a-9d5f-a69395a882a6";
  const fetchProfile = async () => {
    let { data: users, error } = await supabase
      .from("users")
      .select("name, contact, workField, projectId")
      .eq("userId", testUserId);
    // .single();
    console.log(users);
    return users;
  };

  const { status, data: users } = useQuery(
    ["users", testUserId],
    fetchProfile,
    { enabled: !!testUserId }
  );
  const user = users && users[0]; // users가 없을 경우, get the first user

  /**
   * PATCH
   */
  // 이미지 제외 정보 업데이트
  const updateProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 업데이트 대상
    const updatedData = {
      name: updatedName,
      workField: updatedWorkField,
      contact: {
        email: updatedEmail,
        phone: updatedPhone,
      },
      projectId: updatedProjectId,
    };

    // 업데이트
    const { data, error } = await supabase
      .from("users")
      .update(updatedData)
      .eq("userId", testUserId)
      .select();
    console.log(data);

    // 입력창 비우고 모달 닫기
    setUpdatedName("");
    setUpdatedWorkField("");
    setUpdatedEmail("");
    setUpdatedPhone("");
    setUpdatedProjectId("");

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  //--------------------------------------------------------------------------//
  // 이미지 업로드
  // https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/users/5d08341f-b6ed-4e7f-b905-79fabd0bd766/fc59060c-b343-423b-ad4c-0f73a0313d08
  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/users";
  /**
   * To get an image: CDNURL + userId + "/" + image.name
   * images: [image1, image2, image3]
   */

  const getImages = async () => {
    const { data, error } = await supabase.storage
      .from("users")
      .list(userId + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    console.log("data>", data);

    if (data !== null && data.length > 0) {
      setImages(data);
    } else {
      alert("Error loading images");
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, [userId]);

  console.log("상태관리", images[0]);

  const uploadImage = async (e: any) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    const { data, error } = await supabase.storage
      .from("users")
      .upload(userId + "/" + uuidv4(), file as File);

    if (data) {
      // console.log("path-data>", data);
      getImages();
    } else {
      console.log(error);
    }
  };

  return (
    <>
      {status === "loading" ? (
        "Loading..."
      ) : (
        <section
          style={{
            display: "flex",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#f8f5ed",
            border: "solid blue",
          }}
        >
          <img
            src={
              images.length > 0
                ? CDNURL + "/" + userId + "/" + images[images.length - 1].name
                : ""
            }
            alt="img"
            width="60px"
            height="60px"
            style={{ marginLeft: "10px" }}
            onClick={toggleFormVisibility}
          />
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1>{email}님 안녕하세요!</h1>
            <S.Info>직무: {user?.workField}</S.Info>
            <S.Info>현재 진행중인 프로젝트: {user?.projectId}</S.Info>
          </div>
          <div
            style={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1>연락망</h1>
            <S.Info>전화번호: {user?.contact.phone}</S.Info>
            <S.Info>이메일: {user?.contact.email}</S.Info>
          </div>
          <button onClick={() => setOpen(true)}>프로필 수정하기</button>
          {/* ------------------Update modal-------------------------- */}
          <>
            <Modal
              title="개인정보 수정"
              open={open}
              onOk={updateProfile}
              onCancel={handleCancel}
            >
              <form>
                <label>
                  이름:
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </label>
                <label>
                  업무분야:
                  <input
                    type="text"
                    value={updatedWorkField}
                    onChange={(e) => setUpdatedWorkField(e.target.value)}
                  />
                </label>
                <label>
                  이메일:
                  <input
                    type="text"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                  />
                </label>
                <label>
                  전화번호:
                  <input
                    type="text"
                    value={updatedPhone}
                    onChange={(e) => setUpdatedPhone(e.target.value)}
                  />
                </label>
                <label>
                  현재 진행중인 프로젝트:
                  <input
                    type="text"
                    value={updatedProjectId}
                    onChange={(e) => setUpdatedProjectId(e.target.value)}
                  />
                </label>
              </form>
            </Modal>
            {/* ------------------Loginuser UploadImage form-------------------------- */}
            {isFormVisible && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
              />
            )}
          </>
        </section>
      )}
    </>
  );
};

export default Account;

const S = {
  Info: styled.p`
    font-size: 13px;
    color: rgba(0, 0, 0, 0.583);
    margin-top: 5px;
  `,
};
