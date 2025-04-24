"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {

  const { isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    console.log(user);

    if (role) {
      router.push(`/${role}`);
    }

  },[user, router])

  return (
    <div className="flex h-screen items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="flex flex-col gap-2 rounded-lg bg-white p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 text-xl font-bold">
            <Image src="/logo.png" alt="" width={24} height={24} />
            <span>SchooLama</span>
          </div>
          <h2 className="text-gray-400">Sign in to continue</h2>

          <Clerk.GlobalError className="text-xs text-red-500" />

          {/* <Clerk.Field name="identifier"> is necessary for the sign in form to work */}
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">Email</Clerk.Label>
            <Clerk.Input type="email" className="p-2 rounded-md ring-1 ring-gray-300" required />
            <Clerk.FieldError className="text-xs text-red-500"/>
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">Password</Clerk.Label>
            <Clerk.Input type="password" className="p-2 rounded-md ring-1 ring-gray-300" required />
            <Clerk.FieldError className="text-xs text-red-500"/>
          </Clerk.Field>

          <SignIn.Action submit className="px-2 py-1 rounded-md bg-blue-500 text-white text-sm my-1">Sign In</SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
