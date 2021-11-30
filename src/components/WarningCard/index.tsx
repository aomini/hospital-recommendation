import { forwardRef } from "react";

import ShieldIcon from "src/assets/icons/ShieldIcon";
import { StyledButton } from "../Button";
import { H1, BodyText } from "../Typography";

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
            <H1>
              <ShieldIcon className="mx-auto" />
              Are you sure?
            </H1>
          </span>
          <BodyText className="mt-3">
            Do you really want to delete this field? Once done, this action
            cannot be undone.
          </BodyText>
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

export default WarningCard;
