import React from "react";
import DotsHorizontalIcon from "src/assets/icons/DotsHorizontalIcon";

interface ViewMoreButtonProps {
  className?: string;
  updateModal: boolean;
  warningModal: boolean;
  setUpdateModal(a: any): void;
  setWarningModal(a: any): void;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  className = "",
  updateModal,
  warningModal,
  setWarningModal,
  setUpdateModal,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  //   const [warningModal, setWarningModal] = React.useState(false);
  //   const [updateModal, setUpdateModal] = React.useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUpdate = () => {
    setUpdateModal(!updateModal);
  };

  const handleDelete = () => {
    setWarningModal(!warningModal);
  };
  return (
    <section className="relative">
      <button className={`${className}`} onClick={handleClick}>
        <DotsHorizontalIcon />
      </button>
      {menuOpen ? (
        <section className="absolute top-5 bg-gray-50 py-3 shadow-lg h-30 w-32 z-10">
          <ul className="">
            <li>
              <button
                onClick={handleUpdate}
                className="p-3 hover:bg-gray-200 w-full font-medium text-left"
              >
                Update
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="p-3 hover:bg-gray-200 w-full font-medium text-left"
              >
                Delete
              </button>
            </li>
          </ul>
        </section>
      ) : (
        ""
      )}
    </section>
  );
};

export default ViewMoreButton;
