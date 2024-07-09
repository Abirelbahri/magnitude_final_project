"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaMeta, FaArrowRight } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import RegisterForm from "@/components//auth/RegisterForm";
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
    <div className="w-[100vw] h-[100vh] flex justify-center items-center  bg-body">
      <div className="flex  h-[100vh] w-[100vw]  bg-black ">
        <div className=" h-[90vh] w-[60%] rounded-bl-3xl rounded-br-3xl shadow-lg ml-16  flex items-start">
          <Image
            src={"/assets/auth/login1.jpg"}
            className="rounded-br-3xl rounded-bl-3xl h-full  shadow-white"
            alt="k"
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
              <GiEntryDoor className="w-7 h-7 ml-2" width={10} height={10} />
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
              className="flex  w-[60vw] flex-col mt-10  pl-[6%]"
            >
              <h1 className="text-3xl font-semibold text-white mt-[16%]">
                Unlock Your Style Potential <br /> with MAGNITUDE
              </h1>
              {/* <p className='mt-6 ml-1'>Don't have an account ? <Link href="/register">Register</Link> {" "}</p> */}
              <motion.div
                onClick={() => {
                  handleSignIn();
                }}
                className="mt-12 cursor-pointer border-white border-[1px] flex items-center justify-between w-[70%] bg-white text-white p-2 pl-6 rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg"
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderColor: "blue",
                }}
              >
                <FaGoogle className="w-5 h-5" />
                <p>Continue with Google</p>
                <p className="pl-12">|</p>
                <motion.div
                  whileHover={{ borderColor: "blue" }}
                  transition={{ duration: 0.2 }}
                >
                  <FaMeta
                    color="blue"
                    className="bg-black w-8 h-8 rounded-full p-1"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                whileHover={{
                  backgroundColor: "rgba(100 , 116 , 139, 0.7)",
                }}
                onClick={handleShowLoginForm}
                className="mt-2 cursor-pointer flex border-transparent border-[1px] items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg  bg-opacity-60 backdrop-filter backdrop-blur-lg"
              >
                <MdOutlineMailOutline className=" w-5 h-5" />
                <p>Continue with Email</p>
                <p className="pl-12">|</p>
                <FaArrowRight
                  color="white"
                  className="bg-black w-8 h-8 rounded-full p-2"
                />
              </motion.div>
              <p className="mt-5 text-sm">
                By signing in, you agree to Generative AI&apos;s{" "}
                <span className="underline">
                  Terms of Service, <br /> Privacy Policy{" "}
                </span>{" "}
                and <span className="underline">Data Usage Properties.</span>
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
