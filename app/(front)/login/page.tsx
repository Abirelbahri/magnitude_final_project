"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaMeta, FaArrowRight } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import RegisterForm from "@/components/auth/RegisterForm";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GiEntryDoor } from "react-icons/gi";
import Link from "next/link";

const SignInPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/");
    }
  }, [session, router]);

  const handleShowLoginForm = () => {
    setTimeout(() => {
      setShowLogin(true);
    }, 300);
  };

  const handleSignIn = async () => {
    const result = await signIn("google");
    console.log(result);
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
      <div className="flex w-full h-full">
        <div className="h-[90vh] w-[60%] rounded-bl-3xl rounded-br-3xl shadow-lg ml-16 flex items-start">
          <Image
            src={"/assets/auth/login1.jpg"}
            className="rounded-br-3xl rounded-bl-3xl h-full shadow-white"
            alt="login image"
            unoptimized={true}
            width={500}
            height={180}
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/">
              <GiEntryDoor className="w-7 h-7 ml-2 text-white" />
            </Link>
          </motion.div>
        </div>
        <AnimatePresence>
          {!showLogin ? (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8 }}
              className="flex w-[60vw] flex-col mt-10 pl-[6%]"
            >
              <h1 className="text-3xl font-semibold text-white mt-[16%]">
                Unlock Your Style Potential <br /> with MACHINISTE
              </h1>
              <motion.div
                onClick={handleSignIn}
                className="mt-12 cursor-pointer flex items-center justify-between w-[70%] p-2 pl-6 rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg border border-green-500 text-white"
                whileHover={{
                  backgroundColor: "rgba(34, 197, 94, 0.3)",
                  borderColor: "green",
                }}
              >
                <FaGoogle className="w-5 h-5" />
                <p>Continue with Google</p>
                <p className="pl-12">|</p>
                <motion.div
                  whileHover={{ borderColor: "green" }}
                  transition={{ duration: 0.2 }}
                >
                  <FaMeta className="bg-black w-8 h-8 rounded-full p-1 text-green-500" />
                </motion.div>
              </motion.div>
              <motion.div
                whileHover={{
                  backgroundColor: "rgba(99, 102, 241, 0.5)",
                }}
                onClick={handleShowLoginForm}
                className="mt-2 cursor-pointer flex border border-transparent items-center justify-between w-[70%] p-2 pl-6 rounded-xl shadow-lg bg-indigo-600 text-white"
              >
                <MdOutlineMailOutline className=" w-5 h-5" />
                <p>Continue with Email</p>
                <p className="pl-12">|</p>
                <FaArrowRight
                  color="white"
                  className="bg-black w-8 h-8 rounded-full p-2"
                />
              </motion.div>
              <p className="mt-5 text-sm text-gray-400">
                By signing in, you agree to MACHINISTE&apos;s{" "}
                <span className="underline text-white">
                  Terms of Service, <br /> Privacy Policy{" "}
                </span>{" "}
                and <span className="underline text-white">Data Usage Properties.</span>
              </p>
            </motion.div>
          ) : (
            <RegisterForm handleClick={() => setShowLogin(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignInPage;
