'use client';

import ButtonLoading from '@/components/actions/button/ButtonLoading';
import InputField from '@/components/form/input/TextField';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Auth() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setLoading(true);
      const result = (await signIn('credentials', {
        name,
        password,
        redirect: false
      })) as SignInResponse;
      if (result.error) {
        Swal.fire({
          title: 'Error',
          text: result.error,
          icon: 'error'
        });
        return;
      }
      await Swal.fire({
        title: 'Success',
        text: 'Logged in successfully!',
        icon: 'success'
      });
      router.push('/pos');
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Sign in to your POS cafe with your username and password.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <InputField
              label={'Username'}
              placeholder="username"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <InputField
              label={'Password'}
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <div className="form-control mt-6">
              <ButtonLoading loading={loading} className="btn-outline">
                Login
              </ButtonLoading>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}