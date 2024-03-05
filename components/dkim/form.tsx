"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type DkimInput = {
  type: string;
  host: string;
  data: string;
};

export default function DkimForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DkimInput>();
  const onSubmit: SubmitHandler<DkimInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type">
            Type <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Example: TXT"
            {...register("type", { required: true })}
          />
          {errors.type && (
            <p className="text-red-500 text-xs mt-2">Type cannot be empty!</p>
          )}
        </div>
        <div>
          <label htmlFor="host">
            Host <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Example: @"
            {...register("host", { required: true })}
          />
          {errors.host && (
            <p className="text-red-500 text-xs mt-2">Host cannot be empty!</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="data">
          Record value <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="Example: v=DKIM1; p=76E629F05F70..."
          {...register("data", { required: true })}
        />
        {errors.data && (
          <p className="text-red-500 text-xs mt-2">
            Record values cannot be empty!
          </p>
        )}
      </div>
      <Button type="submit" className="mt-8">
        Submit DKIM record!
      </Button>
    </form>
  );
}
