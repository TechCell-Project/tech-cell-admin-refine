"use client";
import { useToast } from "@components/ui/use-toast";
import type {
  AuthPageProps as AuthPagePropsCore,
  HttpError,
} from "@refinedev/core";
import { AuthPage as AuthPageBase } from "@refinedev/core";
import { useEffect } from "react";

type AuthPageProps = AuthPagePropsCore & {
  authenticated?: boolean;
  redirectTo?: string;
  error?: HttpError | Error;
};

export const AuthPage = (props: AuthPageProps) => {
  const { toast } = useToast();
  // console.log(props.error);

  useEffect(() => {
    if (props.error) {
      toast({
        title: "Error",
        description: props.error.message,
      });
    }
  }, [props.error]);

  return (
    <AuthPageBase
      {...props}
      renderContent={(content) => (
        <div>
          <p
            style={{
              padding: 10,
              color: "#004085",
              backgroundColor: "#cce5ff",
              borderColor: "#b8daff",
              textAlign: "center",
            }}
          >
            email: demo@refine.dev
            <br /> password: demodemo
          </p>
          {content}
        </div>
      )}
    />
  );
};
