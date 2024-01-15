"use client";
import { Button, Callout, CalloutRoot, CalloutText, TextArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import{zodResolver} from "@hookform/resolvers/zod"
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({resolver:zodResolver(createIssueSchema)});
  const [error, setError] = useState("");
  return (
<div className="max-w-xl">
{error &&  <Callout.Root color="red" className="mb-5">
    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>}
<form
      className=' space-y-5'
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
        setError("An unexpected error occured. Please try again later.");
        }
      })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register("title")} />
      </TextField.Root>
      {errors.title && <Callout.Root color="red"><CalloutText>{errors.title.message}</CalloutText></Callout.Root>}
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      {errors.description && <Callout.Root color="red"><CalloutText>{errors.description.message}</CalloutText></Callout.Root>}

      <Button>Submit New Issue</Button>
    </form>
</div>
  );
};

export default NewIssuePage;
