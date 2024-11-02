'use client';

import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}


const NewIssue = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IssueForm>();

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
        <TextArea placeholder='Description' {...register('description')}></TextArea>

        {error && <Callout.Root color='red'>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssue