import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FormFieldProps = {
  label: string;
  id: string;
} & (
  | ({ as?: "input" } & InputHTMLAttributes<HTMLInputElement>)
  | ({ as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>)
);

const fieldStyles =
  "w-full px-4 py-3 bg-white border border-gray-300 focus:border-black outline-none transition-colors";

export default function FormField(props: FormFieldProps) {
  const { label, id, as, ...rest } = props;

  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-2">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          className={`${fieldStyles} resize-none`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={fieldStyles}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}
