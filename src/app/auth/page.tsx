'use client';

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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline">
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>Login</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
