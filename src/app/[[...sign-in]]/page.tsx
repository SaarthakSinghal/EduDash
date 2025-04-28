"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Credentials data
const credentials = [
  { email: "admin@example.com", password: "admi@12@" },
  { email: "teacher@teacher.com", password: "teacher12@" },
  { email: "student@student.com", password: "studentst@" },
  { email: "parent@parent.com", password: "parent12@" },
];

export default function SignInPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  // State for credentials visibility
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() => {
    const role = user?.publicMetadata.role;
    // console.log(user);

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    // Adjust background color, add relative positioning context
    <div className="relative flex h-screen items-center justify-center bg-[#F7F8FA]">
      {/* Credentials Toggle Button - Positioned top-right */}
      <button
        onClick={() => setShowCredentials(!showCredentials)}
        className="absolute right-4 top-4 z-10 rounded-full bg-gray-200 p-2 text-sm text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-label="Show test credentials"
        title="Show test credentials"
      >
        {/* Simple icon (e.g., key or info) - Using text for simplicity */}
        🔑
      </button>

      {/* Clerk Sign In Component */}
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="flex flex-col gap-2 rounded-lg bg-white p-6 shadow-xl" // Slightly increased shadow
        >
          <div className="flex items-center gap-2 text-xl font-bold">
            <Image src="/logo.png" alt="" width={24} height={24} />
            <span>EduDash</span>
          </div>
          <h2 className="text-gray-400">Sign in to continue</h2>

          <Clerk.GlobalError className="text-xs text-red-500" />

          {/* <Clerk.Field name="identifier"> is necessary for the sign in form to work */}
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">Email</Clerk.Label>
            <Clerk.Input
              type="email"
              className="rounded-md p-2 ring-1 ring-gray-300"
              required
            />
            <Clerk.FieldError className="text-xs text-red-500" />
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              className="rounded-md p-2 ring-1 ring-gray-300"
              required
            />
            <Clerk.FieldError className="text-xs text-red-500" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="my-1 rounded-md bg-blue-500 px-2 py-1 text-sm text-white"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>

      {/* Conditionally Rendered Credentials Box */}
      {showCredentials && (
        <div className="absolute right-4 top-16 z-10 w-64 rounded-md border border-gray-200 bg-white p-4 text-xs shadow-lg">
          <h4 className="mb-2 font-semibold">Test Credentials</h4>
          <p className="mb-2 text-red-600">
            Note: For testing/demo purposes only.
          </p>
          <ul className="space-y-1">
            {credentials.map((cred, index) => (
              <li key={index}>
                <strong>Email:</strong> {cred.email}
                <br />
                <strong>Pass:</strong> {cred.password}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowCredentials(false)}
            className="mt-3 text-blue-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
