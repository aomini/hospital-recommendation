import styled from "styled-components";

const StyledButton = styled.button`
  padding: ${(props) => (props.sm ? "8px 12px" : "14px 20px")};
  color: ${(props) => (props.success ? "#FFFFFF" : "#000000")};
  background: ${(props) =>
    props.success
      ? "#009E60"
      : props.error
      ? "#9b2c2c"
      : "#FFFFFF"};
      border-radius: "6px"
    };
      &:hover{
          background: ${(props) => (props.success ? "#035333" : "#e2e0e0")}
        };
`;

export default StyledButton;
