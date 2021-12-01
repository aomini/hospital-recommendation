import styled from "styled-components";

const StyledButton = styled.button`
  color: ${(props) => (props.success ? "#FFFFFF" : "#000000")};
  padding: ${(props) => (props.sm ? "8px 12px" : "14px 20px")};
  /* width: ${(props) => (props.sm ? "80px" : "160px")}; */
  background: ${(props) =>
    props.success ? "#009E60" : props.error ? "#9b2c2c" : "#FFFFFF"};
  border-radius: 6px;
  border: ${(props) => (props.primary ? "1px solid #E6EAF0" : "")};
  font-weight: ${(props) => (props.bold ? 500 : "")};
  &:hover {
    background: ${(props) => (props.success ? "#035333" : "#E6EAF0")};
  }
`;

export default StyledButton;
