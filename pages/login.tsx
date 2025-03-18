import InputGroup from '@/components/InputGroup';
import { useAuthDispatch } from '@/context/auth';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from "react";

const Login = () => {
    let router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<any>({});

    const dispatch = useAuthDispatch()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const res = await axios.post('/auth/login', {password,username}, {withCredentials: true} );

            dispatch("LOGIN", res.data?.user);
            router.push("/")

        } catch (error: any) {
            console.log('error', error)
            setErrors(error?.response?.data || {});
        }
    }
    
    return (
        <div className='bg-white'>
            <div className='flex flex-col items-center justify-content h-screen p-6'>
                <div className='w-10/12 mx-auto md:w-96'>
                    <h1 className='mb-2 text-lg font-medium'>로그인</h1>
                    <form onSubmit={handleSubmit}>
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
                            로그인
                        </button>
                    </form>
                    <small>
                        아직 가입하지 않으셨나요?
                        <Link legacyBehavior href="/register">
                            <a className='ml-1 text-blue-500 uppercase'>회원가입</a>
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Login