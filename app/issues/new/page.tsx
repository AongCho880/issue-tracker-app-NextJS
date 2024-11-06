'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';

type IssueForm = z.infer<typeof CreateIssueSchema>


const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(CreateIssueSchema)
  });

  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
      <form className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError("An Unexpected Error Occurred !");
            console.log(error)
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>
        { errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}

        <Controller 
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />

        { errors.description && <Text color='red' as='p'>{errors.description.message}</Text> }

        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssue