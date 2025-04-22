import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

const AddingButton = styled.div`
  padding:5px;
  margin-right:10px;
  color: #0f6b6a;
  border-radius: 4px;
  background-color: rgba(0, 170, 239, 0.3);
  width: 25px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #e7e7e7;
  }
`;
const AddButton = () => {
  return (
    <AddingButton>
      <AiOutlinePlus />
    </AddingButton>
  );
};

export default AddButton;
