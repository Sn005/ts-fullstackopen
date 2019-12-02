import React, { FC, ChangeEvent } from "react";

interface FilterProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Filter: FC<FilterProps> = ({ value, onChange }) => {
  return (
    <div>
      find shown widh: <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
