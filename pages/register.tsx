import InputGroup from '@/components/InputGroup';
import { useAuthDispatch, useAuthState } from '@/context/auth';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from "react";

const Register = () => {
    let router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<any>({});

    const { authenticated } = useAuthState();
    const dispatch = useAuthDispatch();
    if (authenticated) router.push("/");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const res = await axios.post('/auth/register', {
                email,
                password,
                username
            })
            console.log('res', res);
            router.push("/login");
        } catch (error: any) {
            console.log('error', error)
            setErrors(error?.response?.data || {});
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex flex-col items-center justify-content h-screen p-6'>
                <div className='w-10/12 mx-auto md:w-96'>
                    <h1 className='mb-2 text-lg font-medium'>회원가입</h1>
                    <form onSubmit={handleSubmit}>
                        <InputGroup
                            placeholder='Email'
                            value={email}
                            setValue={setEmail}
                            error={errors.email}
                        />
                        <InputGroup
                            placeholder='UserName'
                            value={username}
                            setValue={setUsername}
                            error={errors.username}
                        />
                        <InputGroup
                            placeholder='Password'
                            value={password}
                            setValue={setPassword}
                            error={errors.username}
                        />
                        <button className='w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border-gray-400'>
                            회원 가입
                        </button>
                    </form>
                    <small>
                        이미 가입하셨나요?
                        <Link legacyBehavior href="/login">
                            <a className='ml-1 text-blue-500 uppercase'>로그인</a>
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Register