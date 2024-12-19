"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";



export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });


  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/main");
};




export const signOutAction = async () => {
  const supabase = await createClient();

  await supabase.auth.signOut();
  return redirect("/sign-in");
};




// export const resetPasswordAction = async (formData: FormData) => {
//   const supabase = await createClient();
//
//   const password = formData.get("password") as string;
//   const confirmPassword = formData.get("confirmPassword") as string;
//
//   if (!password || !confirmPassword) {
//     encodedRedirect(
//       "error",
//       "/(dashboard)/reset-password",
//       "Password and confirm password are required",
//     );
//   }
//
//   if (password !== confirmPassword) {
//     encodedRedirect(
//       "error",
//       "/(dashboard)/reset-password",
//       "Passwords do not match",
//     );
//   }
//
//   const { error } = await supabase.auth.updateUser({
//     password: password,
//   });
//
//   if (error) {
//     encodedRedirect(
//       "error",
//       "/(dashboard)/reset-password",
//       "Password update failed",
//     );
//   }
//
//   encodedRedirect("success", "/(dashboard)/reset-password", "Password updated");
// };
