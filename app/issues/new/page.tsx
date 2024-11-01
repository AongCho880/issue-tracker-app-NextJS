'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}


const NewIssue = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<IssueForm>();

  return (
    <form className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}
    >
      <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>
      <TextArea placeholder='Description' {...register('description')}></TextArea>
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssue