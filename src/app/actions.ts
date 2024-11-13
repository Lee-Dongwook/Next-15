/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { permanentRedirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function createUser(prevState: any, formData: FormData) {
  const res = await fetch("https://...");
  const json = await res.json();

  if (!res.ok) {
    return { message: "Please enter a valid email" };
  }

  redirect("/dashboard");
}

export async function createPost(id: string) {
  try {
  } catch (error) {}

  revalidatePath("/posts");
  redirect(`/post/${id}`);
}

export async function updateUsername(username: string, formData: FormData) {
  try {
  } catch (error) {}

  revalidateTag("username");
  permanentRedirect(`/profile/${username}`);
}
