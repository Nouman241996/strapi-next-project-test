"use server";

import { z } from "zod";
import { subscribeService } from "@/data/services";

const SubscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormState = {
  zodErrors: Record<string, string[] | undefined> | null;
  strapiErrors: string[] | null;
  errorMessage: string | null;
  successMessage: string | null;
};

export async function subscribeAction(prevState: FormState, formData: FormData): Promise<FormState> {
  // NOTE: server logs appear in the server console, not the browser devtools
  console.log("Our first server action");

  const email = (formData.get("email") ?? "").toString();

  const result = SubscribeSchema.safeParse({ email });

  if (!result.success) {
    // Example: { email: ["Please enter a valid email address"] }
    const fieldErrors = result.error.flatten().fieldErrors;
    console.dir(fieldErrors, { depth: null });

    return {
      ...prevState,
      zodErrors: fieldErrors,      // <-- exact key matches client
      strapiErrors: null,
      errorMessage: null,
      successMessage: null,
    };
  }
  const responseData = await subscribeService(email);
  if (!responseData || responseData.error) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: responseData?.error?.details || null,
      errorMessage: responseData?.error?.message || "Subscription failed",
      successMessage: null,
    };
  }

  // Successful subscription

  // TODO: handle subscription (DB/API) here
  console.log(email, "Our email input from form");

  // Always return a state on success
  return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    successMessage: "You are subscribed!",
  };
}
