import { forwardRef } from "react";

import ShieldIcon from "src/assets/icons/ShieldIcon";
import { PrimaryButton } from "../Button";
import { H1, BodyText } from "../Typography";

const WarningCard = forwardRef<>((props, ref ) => {
  return (
    <div className="fixed w-full h-screen opacity-25 bg-gray-400 z-20">
      <div
        className="bg-white !opacity-0 w-1/3 mx-auto my-32 p-3 z-50"
        ref={ref}
      >
        <span className="text-red-500 flex-col justify-center text-center">
          <H1>
            <ShieldIcon className="mx-auto" />
            Are you sure?
          </H1>
        </span>
        <BodyText>
          Do you really want to delete this field? Once done, this action cannot
          be undone.
        </BodyText>
        <PrimaryButton>No, cancel it.</PrimaryButton>
      </div>
    </div>
  );
});

export default WarningCard;
