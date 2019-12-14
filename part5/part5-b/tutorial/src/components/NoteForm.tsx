import React, { FC, FormEvent, ChangeEvent } from "react";

interface NoteFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const NoteForm: FC<NoteFormProps> = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit}>
        <input value={value} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
