import { login, signup } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => useMutation(login);

export const useSignupMutation = () => useMutation(signup);
