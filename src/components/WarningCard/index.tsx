import React, { forwardRef } from "react";
import ShieldIcon from "src/assets/icons/ShieldIcon";
import { StyledButton } from "../Button";
import { H1 } from "../Typography";

type Ref = HTMLDivElement;
interface Props {
  setWarning(a: any): void;
  handleDelete(a: any): void;
  userId: number | undefined;
}

const WarningCard = forwardRef<Ref, Props>(
  ({ setWarning, handleDelete, userId }, ref) => {
    return (
      <div className="absolute top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-25 z-20">
        <div
          className="bg-white w-1/3 mx-auto my-40 p-4 z-50 rounded-md"
          ref={ref}
        >
          <span className="text-red-500 flex-col justify-center text-center">
            <ShieldIcon className="mx-auto h-12 w-12" />
            <H1>Are you sure?</H1>
          </span>
          <h5 className="mt-3 text-center">
            Do you really want to delete this field?
            <p className="text-sm text-gray-600">
              Once done, this action cannot be undone.
            </p>
          </h5>
          <section className="flex items-center justify-around mt-3">
            <StyledButton primary bold onClick={() => setWarning(false)}>
              No, cancel it.
            </StyledButton>
            <StyledButton
              success
              bold
              onClick={() => {
                handleDelete(userId);
                setWarning(false);
              }}
            >
              Yes, I'm sure.
            </StyledButton>
          </section>
        </div>
      </div>
    );
  }
);

WarningCard.displayName = "WarningCard";

export default WarningCard;
