import { styled } from "styled-components";

export const S = {
  PFTitle: styled.span`
    font-size: 20px;
  `,
  PFThumbnailContainer: styled.div`
    margin: 20px 0;
    background-color: aliceblue;
    height: 230px;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  PFDetailWrapper: styled.div`
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 10px;
    line-height: 1.4;
  `,
  PFDetail: styled.div`
    line-height: 1.4;
    white-space: pre-line;
  `,
  PFPDFContainer: styled.div`
    margin: 20px 0;
    margin-top: 25%;

    text-align: center;
    a {
      color: black;
      text-decoration: none;
      transition: 0.15s ease-in-out;
    }

    a:hover {
      color: var(--main-blue);
    }
  `,

  PFLinkContainer: styled.div`
    a {
      color: black;
      text-decoration: none;
      transition: 0.15s ease-in-out;
    }

    a:hover {
      color: var(--main-blue);
    }
  `,
};
