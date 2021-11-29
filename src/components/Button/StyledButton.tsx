import styled from "styled-components";

const StyledButton = styled.button`
  color: ${(props) => (props.success ? "#FFFFFF" : "#000000")};
  padding: ${(props) => (props.sm ? "8px 12px" : "14px 20px")};
  /* width: ${(props) => (props.sm ? "80px" : "160px")}; */
  background: ${(props) =>
    props.success ? "#009E60" : props.error ? "#9b2c2c" : "#FFFFFF"};
  border-radius: "6px";
  &:hover {
    background: ${(props) => (props.success ? "#035333" : "#D0D7E2")};
  }
`;

export default StyledButton;
