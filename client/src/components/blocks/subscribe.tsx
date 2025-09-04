"use client";
import type { SubscribeProps } from "@/types";
import { subscribeAction } from "@/data/actions";
import { useActionState } from "react";

const INITIAL_STATE = { 
    zodErrors: null,
    strapiErrors: null,
    errorMessage : null,
    successMessage: null,

 }; 
export function Subscribe({
  headline,
  content,
  placeholder,
  buttonText,
}: Readonly<SubscribeProps>) {

    const [formState, formAction] = useActionState(
        subscribeAction, 
        INITIAL_STATE
    );
    console.log(formState, "Form State");
    const zodErrors = formState?.zodErrors?.email?.[0];
    const strapiErrors = formState?.strapiErrors?.[0];
    const successMessage = formState?.successMessage;
    const errorMessage = zodErrors || formState?.errorMessage || strapiErrors;
    console.log(zodErrors, "Zod Errors");
  return (
    <section className="newsletter container">
      <div className="newsletter__info">
        <h4>{headline}</h4>
        <p className="copy">{content}</p>
      </div>
      <form className="newsletter__form" action={formAction}>
        <input
          name="email"
          type="text"
          placeholder={errorMessage || successMessage || placeholder}
          className={`newsletter__email ${errorMessage ? "newsletter__email--error" : ""}`}
        />
        <button
          type="submit"
          className="newsletter__subscribe btn btn--turquoise btn--medium"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}