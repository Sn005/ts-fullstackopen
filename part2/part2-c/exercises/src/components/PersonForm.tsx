import React, { FC, ChangeEvent } from "react";

interface PersonFormProps {
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onNumberChange: (event: ChangeEvent<HTMLInputElement>) => void;
  nameValue: string;
  numberValue: string;
}

const Filter: FC<PersonFormProps> = ({
  onNameChange,
  onNumberChange,
  nameValue,
  numberValue
}) => {
  return (
    <>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={onNumberChange} />
      </div>
    </>
  );
};

export default Filter;
