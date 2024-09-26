"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./LoginForm";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = ({ handleClick }: any) => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const [error, setError] = useState('');
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }

      if (res.status === 201) {
        setError('');
        setShowLogin(true);
      }
    } catch (error: any) {
      setError('Error in registration, please try again');
      console.log(error);
    }
  };

  const handleShowLoginForm = () => {
    setTimeout(() => {
      setShowLogin(true);
    }, 300);
  };

  return (
    <AnimatePresence>
      {!showLogin ? (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
          transition={{ duration: 0.9 }}
          className="flex w-[60vw] flex-col pl-[6%]"
        >
          <h1 className="text-3xl font-semibold text-white mt-[16%] leading-tight">
            Create Your Account to <br />
            Unleash Your Dreams
          </h1>
          <div className="mt-10 flex items-center justify-between w-[70%]">
            <FaArrowLeft
              onClick={handleClick}
              className="bg-gray-600 w-8 h-8 rounded-full p-2 cursor-pointer hover:bg-gray-500 transition"
              color="white"
            />
            <p className="font-light text-sm pl-[18%] text-white">
              Already have an account?
            </p>
            <button
              onClick={handleShowLoginForm}
              className="bg-gray-800 text-white rounded-xl p-2 underline hover:bg-gray-700 transition"
            >
              Log in
            </button>
          </div>
          <form onSubmit={handleSubmit(formSubmit)} className="mt-6">
            <input
              type="text"
              required
              {...register("name", { required: "Name is required" })}
              placeholder="Full Name"
              className="w-[70%] p-2 pl-6 rounded-xl bg-gray-700 text-white focus:bg-gray-600 focus:outline-none transition-all mb-3"
            />
            {errors.name?.message && (
              <div className="text-red-500 mb-2">{errors.name.message}</div>
            )}
            <input
              type="email"
              required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Email is invalid",
                },
              })}
              placeholder="Email Address"
              className="w-[70%] p-2 pl-6 rounded-xl bg-gray-700 text-white focus:bg-gray-600 focus:outline-none transition-all mb-3"
            />
            {errors.email?.message && (
              <div className="text-red-500 mb-2">{errors.email.message}</div>
            )}
            <input
              type="password"
              required
              {...register('password', {
                required: 'Password is required',
              })}
              placeholder="Password"
              className="w-[70%] p-2 pl-6 rounded-xl bg-gray-700 text-white focus:bg-gray-600 focus:outline-none transition-all mb-3"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-between w-[70%] bg-green-600 text-white p-2 rounded-xl hover:bg-green-500 transition-all duration-200 disabled:opacity-50"
            >
              <p className="font-thin items-center">Create Account</p>
              <FaArrowRight
                color="white"
                className="bg-black w-8 h-8 rounded-full p-2"
              />
            </button>
          </form>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
          <p className="mt-5 font-light text-sm text-gray-400 leading-tight">
            By signing in, you agree to MACHINISTE&apos;s{" "}
            <span className="underline text-white">Terms of Service</span>, <br />{" "}
            <span className="underline text-white">Privacy Policy</span>, and{" "}
            <span className="underline text-white">Data Usage Properties</span>.
          </p>
        </motion.div>
      ) : (
        <LoginForm handleclick={() => setShowLogin(false)} />
      )}
    </AnimatePresence>
  );
};

export default RegisterForm;
