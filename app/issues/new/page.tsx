'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { CreateIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { z } from 'zod';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

type IssueForm = z.infer<typeof CreateIssueSchema>

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'), 
  { ssr: false }
);


const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(CreateIssueSchema)
  });

  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
      setError("An Unexpected Error Occurred !");
      console.log(error)
    }
  });


  return (
    <div className='max-w-xl'>
      <form className='space-y-3'
        onSubmit={onSubmit}
      >
        <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default NewIssue